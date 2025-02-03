import CryptoJS from 'crypto-js';

// Admin credentials (in a real app, these would be in a secure backend)
const ADMIN_CREDENTIALS = {
  username: 'admin@mohja.com',
  // Password hash for extra security
  passwordHash: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918' // admin
};

// Secret key for JWT (in a real app, this would be in environment variables)
const JWT_SECRET = 'mohja-secret-key-2025';

class AuthService {
  // Hash password before comparing
  static hashPassword(password) {
    return CryptoJS.SHA256(password).toString();
  }

  // Create JWT token
  static createToken(username) {
    const now = new Date();
    const expiresIn = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours

    const payload = {
      username,
      iat: now.getTime(),
      exp: expiresIn.getTime()
    };

    return CryptoJS.AES.encrypt(JSON.stringify(payload), JWT_SECRET).toString();
  }

  // Verify JWT token
  static verifyToken(token) {
    try {
      const decrypted = CryptoJS.AES.decrypt(token, JWT_SECRET).toString(CryptoJS.enc.Utf8);
      const payload = JSON.parse(decrypted);
      
      if (payload.exp < new Date().getTime()) {
        return false;
      }
      
      return true;
    } catch (error) {
      return false;
    }
  }

  // Login function
  static async login(username, password) {
    // Add artificial delay to prevent brute force
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (username !== ADMIN_CREDENTIALS.username) {
      throw new Error('Invalid credentials');
    }

    const hashedPassword = this.hashPassword(password);
    if (hashedPassword !== ADMIN_CREDENTIALS.passwordHash) {
      throw new Error('Invalid credentials');
    }

    const token = this.createToken(username);
    const expiresIn = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

    // Store auth data
    localStorage.setItem('authToken', token);
    localStorage.setItem('username', username);
    localStorage.setItem('expiresIn', expiresIn.toISOString());

    return {
      username,
      expiresIn
    };
  }

  // Logout function
  static logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    localStorage.removeItem('expiresIn');
  }

  // Check if user is authenticated
  static isAuthenticated() {
    const token = localStorage.getItem('authToken');
    if (!token) return false;

    return this.verifyToken(token);
  }

  // Get current session info
  static getSession() {
    if (!this.isAuthenticated()) return null;

    return {
      username: localStorage.getItem('username'),
      expiresIn: new Date(localStorage.getItem('expiresIn'))
    };
  }
}

export default AuthService;
