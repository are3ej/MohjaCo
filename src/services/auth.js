import { 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '../firebase';

const ADMIN_EMAIL = 'areejaldabbagh03@gmail.com';

class AuthService {
  constructor() {
    this.currentUser = null;
    this.authStateListeners = new Set();
    
    onAuthStateChanged(auth, (user) => {
      this.currentUser = user;
      this.notifyListeners(user);
    });
  }

  async login(email, password) {
    try {
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user.email !== ADMIN_EMAIL) {
        await this.logout();
        throw new Error('Unauthorized access. Admin privileges required.');
      }

      // Store the user's token in localStorage
      const token = await user.getIdToken();
      localStorage.setItem('authToken', token);

      return user;
    } catch (error) {
      console.error('Login error:', {
        code: error.code,
        message: error.message
      });

      switch (error.code) {
        case 'auth/invalid-email':
          throw new Error('Invalid email address');
        case 'auth/user-disabled':
          throw new Error('This account has been disabled');
        case 'auth/user-not-found':
          throw new Error('User not found');
        default:
          throw error;
      }
    }
  }

  async logout() {
    try {
      await signOut(auth);
      localStorage.removeItem('authToken');
      this.currentUser = null;
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  getCurrentUser() {
    return this.currentUser;
  }

  async checkAdminStatus() {
    try {
      // Check if there's an authenticated user
      const user = this.getCurrentUser();
      
      if (!user) {
        console.log('No user authenticated');
        return false;
      }

      // Check if the authenticated user is the admin
      if (user.email !== ADMIN_EMAIL) {
        console.log('User is not an admin', user.email);
        return false;
      }

      // Verify the token is still valid
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.log('No authentication token found');
        return false;
      }

      // Optional: You might want to add additional token validation here
      return true;
    } catch (error) {
      console.error('Admin status check failed:', error);
      return false;
    }
  }

  isAuthenticated() {
    return !!localStorage.getItem('authToken');
  }

  isAdmin() {
    return this.currentUser?.email === ADMIN_EMAIL;
  }

  onAuthStateChanged(listener) {
    this.authStateListeners.add(listener);
    listener(this.currentUser);
    
    return () => {
      this.authStateListeners.delete(listener);
    };
  }

  notifyListeners(user) {
    this.authStateListeners.forEach(listener => {
      try {
        listener(user);
      } catch (error) {
        console.error('Error in auth state listener:', error);
      }
    });
  }
}

// Create a singleton instance
const authService = new AuthService();

// Export both the class and the instance
export { authService };