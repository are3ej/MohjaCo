import { Cloudinary } from '@cloudinary/url-gen';
import { scale } from '@cloudinary/url-gen/actions/resize';

// Environment Configuration
const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.REACT_APP_CLOUDINARY_API_KEY;
const API_SECRET = process.env.REACT_APP_CLOUDINARY_API_SECRET;

// Validate Cloudinary Configuration
if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
  console.error('Missing Cloudinary configuration. Please check environment variables.');
}

// Initialize Cloudinary
const cloudinaryInstance = new Cloudinary({
  cloud: {
    cloudName: CLOUD_NAME
  }
});

const cloudinaryService = {
  /**
   * Fetch images from Cloudinary
   * @param {Object} options - Fetching options
   * @returns {Promise<Array>} List of images
   */
  async fetchCloudinaryImages() {
    try {
      // Note: This is a placeholder. In browser environment, 
      // you'll need to use Cloudinary's Admin API via a backend proxy
      console.warn('Direct image fetching not supported in browser. Use a backend proxy.');
      return [];
    } catch (error) {
      console.error('Error fetching Cloudinary images:', error);
      return [];
    }
  },

  /**
   * Generate a thumbnail URL for an image
   * @param {string} publicId - Cloudinary public ID
   * @param {Object} [options={}] - Thumbnail generation options
   * @returns {string} Thumbnail URL
   */
  generateThumbnailUrl(publicId, options = {}) {
    const { 
      width = 200, 
      height = 200 
    } = options;

    try {
      return cloudinaryInstance
        .image(publicId)
        .resize(scale().width(width).height(height))
        .toURL();
    } catch (error) {
      console.error('Error generating thumbnail URL:', error);
      return '';
    }
  },

  /**
   * Generate a direct image URL with transformations
   * @param {string} publicId - Cloudinary public ID
   * @param {Object} [options={}] - Image URL generation options
   * @returns {string} Image URL
   */
  getImageUrl(publicId, options = {}) {
    const { 
      width, 
      height 
    } = options;

    try {
      const imageUrl = cloudinaryInstance.image(publicId);
      
      if (width || height) {
        imageUrl.resize(scale()
          .width(width)
          .height(height)
        );
      }

      return imageUrl.toURL();
    } catch (error) {
      console.error('Error generating image URL:', error);
      return '';
    }
  },

  /**
   * Upload an image to Cloudinary
   * @param {File|string} file - File to upload
   * @param {Object} [options={}] - Upload configuration
   * @returns {Promise<Object|null>} Upload result
   */
  async uploadImage() {
    try {
      console.warn('Direct image upload not supported in browser. Use a backend proxy.');
      return null;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  }
};

export default cloudinaryService;