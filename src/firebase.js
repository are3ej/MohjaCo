import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc 
} from 'firebase/firestore';
import { 
  getStorage, 
  ref,
  uploadBytes, 
  getDownloadURL 
} from 'firebase/storage';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged 
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCHzw8zZIb0VzkKrDLWDBmVaZy_TWJBMA8",
  authDomain: "mohja-1a6d4.firebaseapp.com",
  projectId: "mohja-1a6d4",
  storageBucket: "mohja-1a6d4.firebasestorage.app",
  messagingSenderId: "415250565266",
  appId: "1:415250565266:web:b8aa75f1ec1c02a5bbbe4b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
// Admin email configuration with fallback and flexibility
const ADMIN_EMAILS = [
  process.env.REACT_APP_ADMIN_EMAIL || 'areejaldabbagh03@gmail.com'
];

// Enhanced equipment service methods
export const equipmentService = {
  // Add new equipment with comprehensive validation
  async addEquipment(equipmentData) {
    // Performance and error tracking
    console.group('Equipment Addition Service');
    console.time('Equipment Addition Duration');

    try {
      // Validate input data
      if (!equipmentData) {
        console.warn('No equipment data provided');
        throw new Error('Equipment data is required');
      }

      // Validate required fields
      const requiredFields = ['name', 'category', 'images'];
      const missingFields = requiredFields.filter(field => 
        !equipmentData[field] || 
        (field === 'images' && (!equipmentData.images[0] || !equipmentData.images[0].url))
      );
      
      if (missingFields.length > 0) {
        console.error('Missing required fields:', missingFields);
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      // Ensure Firestore is initialized
      if (!db) {
        console.error('Firestore database not initialized');
        throw new Error('Firestore database not initialized');
      }

      // Reference to equipment collection
      const equipmentRef = collection(db, 'equipment');

      // Prepare document for Firestore with additional validation
      const equipmentToAdd = {
        ...equipmentData,
        name: equipmentData.name.trim(),
        category: equipmentData.category.trim(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        // Ensure numeric fields are properly parsed
        price: equipmentData.price ? parseFloat(equipmentData.price) : 0,
        year: equipmentData.year ? parseInt(equipmentData.year) : new Date().getFullYear()
      };

      // Log the data being added with sensitive info redacted
      console.log('Adding Equipment Data:', {
        name: equipmentToAdd.name,
        category: equipmentToAdd.category,
        imageCount: equipmentToAdd.images?.length || 0
      });

      // Add document to Firestore
      const docRef = await addDoc(equipmentRef, equipmentToAdd);

      // Verify document creation
      if (!docRef.id) {
        console.error('Failed to create equipment document');
        throw new Error('Failed to create equipment document');
      }

      // Success logging
      console.log('Equipment Added Successfully:', {
        id: docRef.id,
        name: equipmentToAdd.name
      });

      // Return the added document with its new ID
      return { 
        id: docRef.id, 
        ...equipmentToAdd 
      };

    } catch (error) {
      // Comprehensive error logging
      console.error("Detailed Error Adding Equipment:", {
        message: error.message,
        code: error.code,
        stack: error.stack,
        data: {
          name: equipmentData?.name,
          category: equipmentData?.category
        }
      });

      // Throw a more informative error
      throw new Error(`Equipment addition failed: ${error.message}`);

    } finally {
      // Log performance and close group
      console.timeEnd('Equipment Addition Duration');
      console.groupEnd();
    }
  },

  // Get all equipment with centralized admin check
  async getEquipment() {
    try {
      // Centralized admin check
      if (!authService.isAdmin()) {
        throw new Error('Unauthorized access. Admin privileges required.');
      }

      const equipmentRef = collection(db, 'equipment');
      const querySnapshot = await getDocs(equipmentRef);

      const equipmentList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      return equipmentList;
    } catch (error) {
      console.error('Equipment Fetch Error:', error);
      throw error;
    }
  },

  // Update equipment
  async updateEquipment(id, updatedData) {
    try {
      // Centralized admin check
      if (!authService.isAdmin()) {
        throw new Error('Unauthorized access. Admin privileges required.');
      }

      const docRef = doc(db, 'equipment', id);
      await updateDoc(docRef, updatedData);
      return { id, ...updatedData };
    } catch (error) {
      console.error("Error updating equipment:", error);
      throw error;
    }
  },

  // Delete equipment
  async deleteEquipment(id) {
    try {
      // Centralized admin check
      if (!authService.isAdmin()) {
        throw new Error('Unauthorized access. Admin privileges required.');
      }

      await deleteDoc(doc(db, 'equipment', id));
      return id;
    } catch (error) {
      console.error("Error deleting equipment:", error);
      throw error;
    }
  },

  // Enhanced image upload method
  async uploadImage(file) {
    if (!file) {
      console.error('No file provided for upload');
      throw new Error('No file selected');
    }

    try {
      // Validate file type and size
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const maxFileSize = 5 * 1024 * 1024; // 5MB

      if (!validImageTypes.includes(file.type)) {
        console.warn('Invalid file type', { fileType: file.type });
        throw new Error('Only JPG, PNG, and GIF files are allowed');
      }

      if (file.size > maxFileSize) {
        console.warn('File too large', { fileSize: file.size });
        throw new Error('Image must be smaller than 5MB');
      }

      // Generate unique filename
      const filename = `equipment_${Date.now()}_${file.name}`;
      const storageRef = ref(storage, `equipment_images/${filename}`);

      // Upload file with detailed logging
      console.log('Starting image upload', { 
        filename, 
        fileType: file.type, 
        fileSize: file.size 
      });

      const snapshot = await uploadBytes(storageRef, file);
      console.log('Image uploaded successfully', { 
        path: snapshot.ref.fullPath 
      });

      // Get download URL with error handling
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      if (!downloadURL) {
        throw new Error('Failed to get download URL');
      }

      console.log('Image download URL generated', { downloadURL });
      return downloadURL;

    } catch (error) {
      console.error('Image Upload Error:', {
        message: error.message,
        code: error.code
      });

      // Specific error handling
      switch (error.code) {
        case 'storage/unauthorized':
          throw new Error('Unauthorized access. Check your permissions.');
        case 'storage/canceled':
          throw new Error('Upload was canceled.');
        case 'storage/unknown':
          throw new Error('An unknown error occurred during upload.');
        default:
          throw error;
      }
    }
  }
};

// Authentication service
export const authService = {
  // Get current user
  getCurrentUser() {
    return auth.currentUser;
  },

  // Admin login method with enhanced logging and multi-email support
  async adminLogin(email, password) {
    try {
      console.log('Login Attempt:', { 
        email, 
        allowedAdminEmails: ADMIN_EMAILS 
      });

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log('User Authenticated:', {
        uid: user.uid,
        email: user.email
      });

      // Verify admin email with more flexible checking
      if (!ADMIN_EMAILS.includes(user.email)) {
        console.warn('Unauthorized Email:', {
          attemptedEmail: user.email,
          allowedEmails: ADMIN_EMAILS
        });
        
        await signOut(auth);
        throw new Error('Unauthorized access. Admin privileges required.');
      }

      return user;
    } catch (error) {
      console.error('Admin Login Error:', {
        code: error.code,
        message: error.message
      });
      throw error;
    }
  },

  // Logout method
  async logout() {
    try {
      await signOut(auth);
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Logout Error:', error);
      throw error;
    }
  },

  // Check current authentication state with multi-email support
  onAuthStateChanged(callback) {
    return onAuthStateChanged(auth, (user) => {
      console.log('Auth State Changed:', {
        user: user ? user.email : null
      });

      if (user && ADMIN_EMAILS.includes(user.email)) {
        callback(user);
      } else {
        callback(null);
      }
    });
  },

  // Centralized admin check method
  isAdmin() {
    const currentUser = auth.currentUser;
    return currentUser && ADMIN_EMAILS.includes(currentUser.email);
  }
};

export default app;