import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  where,
  getDoc
} from 'firebase/firestore';
import { db, auth } from '../firebase';

const COLLECTION_NAME = 'equipment';
const SOLD_EQUIPMENT_COLLECTION = 'soldEquipment';
const CONTACT_MESSAGES_COLLECTION = 'contact_messages';
const ITEMS_PER_PAGE = 10;

class FirebaseService {
  constructor() {
    this.collection = collection(db, COLLECTION_NAME);
    this.soldEquipmentCollection = collection(db, SOLD_EQUIPMENT_COLLECTION);
    this.contactMessagesCollection = collection(db, CONTACT_MESSAGES_COLLECTION);
  }

  // Validation helper
  validateEquipmentData(data) {
    const requiredFields = ['name', 'category', 'images'];
    const missingFields = requiredFields.filter(field => !data[field]);

    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    if (data.name.trim().length < 2) {
      throw new Error('Equipment name must be at least 2 characters long');
    }

    // Validate image URLs
    if (!Array.isArray(data.images) || data.images.length === 0) {
      throw new Error('At least one image URL is required');
    }

    const validUrls = data.images.every(url => {
      try {
        const parsedUrl = new URL(url);
        return parsedUrl.hostname.includes('cloudinary.com');
      } catch {
        return false;
      }
    });

    if (!validUrls) {
      throw new Error('Only Cloudinary image URLs are allowed');
    }

    return true;
  }

  // Check if user is authenticated
  checkUserAuthentication() {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User must be authenticated to perform this action');
    }
    return user;
  }

  // Create new equipment
  async createEquipment(equipmentData) {
    try {
      this.validateEquipmentData(equipmentData);
      const user = this.checkUserAuthentication();

      const docRef = await addDoc(this.collection, {
        ...equipmentData,
        status: 'available', // Default status
        createdBy: user.uid,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      return docRef.id;
    } catch (error) {
      console.error('Error creating equipment:', error);
      throw error;
    }
  }

  // Get all equipment
  async getAllEquipment() {
    try {
      const snapshot = await getDocs(this.collection);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting equipment:', error);
      throw error;
    }
  }

  // Add sold equipment
  async addSoldEquipment(equipmentData) {
    try {
      const user = this.checkUserAuthentication();

      await addDoc(this.soldEquipmentCollection, {
        ...equipmentData,
        soldAt: new Date(equipmentData.soldAt).toISOString(),
        createdBy: user.uid,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error adding sold equipment:', error);
      throw error;
    }
  }

  // Get sold equipment
  async getSoldEquipment() {
try {
      const snapshot = await getDocs(this.soldEquipmentCollection);
      if (snapshot.empty) {
        console.log('No sold equipment found in Firestore.'); // Debugging log
        return [];
      }
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching sold equipment:', error); // Log the full error
      throw error;
    }
  }

  // Update equipment
  async updateEquipment(id, equipmentData) {
    try {
      this.validateEquipmentData(equipmentData);
      const user = this.checkUserAuthentication();

      const equipmentRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(equipmentRef, {
        ...equipmentData,
        updatedBy: user.uid,
        updatedAt: new Date().toISOString()
      });

      return id;
    } catch (error) {
      console.error('Error updating equipment:', error);
      throw error;
    }
  }

  // Mark equipment as sold
  async markEquipmentAsSold(id, soldData) {
    try {
      const user = this.checkUserAuthentication();

    // Get the equipment document
    const equipmentRef = doc(db, COLLECTION_NAME, id);
    const equipmentDoc = await getDoc(equipmentRef);

    if (!equipmentDoc.exists()) {
      throw new Error('Equipment not found');
    }

    // Add to sold equipment collection
    await addDoc(this.soldEquipmentCollection, {
      ...equipmentDoc.data(),
      ...soldData,
      soldAt: new Date().toISOString(),
      updatedBy: user.uid,
      updatedAt: new Date().toISOString()
    });

    // Delete from equipment collection
    await deleteDoc(equipmentRef);

    return id;
  } catch (error) {
    console.error('Error marking equipment as sold:', error);
    throw error;
  }
}
  // Pagination method
  async getEquipmentPaginated(lastDoc = null, itemsPerPage = ITEMS_PER_PAGE) {
    try {
      let q = query(
        this.collection,
        orderBy('createdAt', 'desc'),
        limit(itemsPerPage)
      );

      if (lastDoc) {
        q = query(
          this.collection,
          orderBy('createdAt', 'desc'),
          startAfter(lastDoc),
          limit(itemsPerPage)
        );
      }

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching paginated equipment:', error);
      throw error;
    }
  }

  // Submit contact form message
  async submitContactForm(contactData) {
    try {
      if (!contactData.name || !contactData.email || !contactData.message) {
        throw new Error('Name, email, and message are required');
      }

      const docRef = await addDoc(this.contactMessagesCollection, {
        ...contactData,
        receivedAt: new Date().toISOString(),
        processed: false
      });

      return docRef.id;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  }

  // Get equipment by ID
  async getEquipmentById(id) {
    try {
      const equipmentRef = doc(db, COLLECTION_NAME, id);
      const docSnapshot = await getDoc(equipmentRef);

      if (docSnapshot.exists()) {
        return {
          id: docSnapshot.id,
          ...docSnapshot.data()
        };
      } else {
        throw new Error('Equipment not found');
      }
    } catch (error) {
      console.error('Error fetching equipment by ID:', error);
      throw error;
    }
  }

  // Get equipment by category
  async getEquipmentByCategory(category) {
    try {
      const q = query(this.collection, where('category', '==', category));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching equipment by category:', error);
      throw error;
    }
  }

  // Delete equipment
  async deleteEquipment(id) {
    try {
      const user = this.checkUserAuthentication();
      const equipmentRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(equipmentRef);
      return id;
    } catch (error) {
      console.error('Error deleting equipment:', error);
      throw error;
    }
  }

  // Return sold equipment back to available
  async returnSoldEquipment(soldEquipmentId) {
    try {
      const user = this.checkUserAuthentication();
      
      // Get the sold equipment document
      const soldEquipmentRef = doc(db, SOLD_EQUIPMENT_COLLECTION, soldEquipmentId);
      const soldEquipmentDoc = await getDoc(soldEquipmentRef);

      if (!soldEquipmentDoc.exists()) {
        throw new Error('Sold equipment not found');
      }

      const soldData = soldEquipmentDoc.data();
      
      // Remove sold-specific fields and set status back to available
      const { soldAt, soldPrice, soldNotes, updatedBy, updatedAt, ...equipmentData } = soldData;
      
      // Add back to equipment collection
      await addDoc(this.collection, {
        ...equipmentData,
        status: 'available',
        updatedBy: user.uid,
        updatedAt: new Date().toISOString()
      });

      // Delete from sold equipment collection
      await deleteDoc(soldEquipmentRef);

      return soldEquipmentId;
    } catch (error) {
      console.error('Error returning sold equipment:', error);
      throw error;
    }
  }
}

export const firebaseService = new FirebaseService();