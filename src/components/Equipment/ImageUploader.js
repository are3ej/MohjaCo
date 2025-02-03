import React, { useEffect } from 'react';

const ImageUploader = ({ onUploadSuccess }) => {
  useEffect(() => {
    // Create and append Cloudinary Upload Widget script
    const script = document.createElement('script');
    script.src = "https://upload-widget.cloudinary.com/global/all.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const openWidget = () => {
    // Replace 'your-cloud-name' with your actual Cloudinary cloud name
    window.cloudinary.createUploadWidget(
      {
        cloudName: 'your-cloud-name',
        uploadPreset: 'equipment_images', // Create this in your Cloudinary settings
        sources: ['local', 'url', 'camera'],
        multiple: true,
        maxFiles: 5,
        maxFileSize: 5000000, // 5MB
        folder: 'equipment',
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          // Get the secure URL of the uploaded image
          const secureUrl = result.info.secure_url;
          onUploadSuccess(secureUrl);
        }
      }
    ).open();
  };

  return (
    <button
      onClick={openWidget}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Upload Images
    </button>
  );
};

export default ImageUploader;
