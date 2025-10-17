import React, { useEffect, useState } from 'react';
import { Cloudinary } from '@cloudinary/base';

const MediaUploader = ({ onUploadSuccess, mediaType = 'both' }) => {
  const [uploadedMedia, setUploadedMedia] = useState([]);

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
    const config = {
      cloudName: 'your-cloud-name',
      uploadPreset: 'equipment_media', // Create this in your Cloudinary settings
      sources: ['local', 'url', 'camera'],
      multiple: true,
      maxFiles: 10,
      maxFileSize: 100000000, // 100MB for videos
      folder: 'equipment',
      resourceType: mediaType === 'images' ? 'image' : mediaType === 'videos' ? 'video' : 'auto',
      clientAllowedFormats: mediaType === 'images' ? ['jpg', 'jpeg', 'png', 'gif', 'webp'] : 
                           mediaType === 'videos' ? ['mp4', 'mov', 'avi', 'webm', 'mkv'] : 
                           ['jpg', 'jpeg', 'png', 'gif', 'webp', 'mp4', 'mov', 'avi', 'webm', 'mkv']
    };

    window.cloudinary.createUploadWidget(
      config,
      (error, result) => {
        if (!error && result && result.event === "success") {
          // Get the secure URL of the uploaded media
          const secureUrl = result.info.secure_url;
          const mediaType = result.info.resource_type; // 'image' or 'video'
          const newMedia = {
            url: secureUrl,
            type: mediaType,
            publicId: result.info.public_id,
            format: result.info.format
          };
          
          setUploadedMedia(prev => [...prev, newMedia]);
          onUploadSuccess(newMedia);
        }
      }
    ).open();
  };

  return (
    <div>
      <button
        onClick={openWidget}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Upload {mediaType === 'images' ? 'Images' : mediaType === 'videos' ? 'Videos' : 'Media'}
      </button>
      
      {uploadedMedia.length > 0 && (
        <div className="mt-4">
          <h4 className="font-bold mb-2">Uploaded Media:</h4>
          <div className="grid grid-cols-2 gap-2">
            {uploadedMedia.map((media, index) => (
              <div key={index} className="border rounded p-2">
                {media.type === 'image' ? (
                  <img 
                    src={media.url} 
                    alt={`Uploaded ${index + 1}`}
                    className="w-full h-20 object-cover rounded"
                  />
                ) : (
                  <video 
                    src={media.url} 
                    className="w-full h-20 object-cover rounded"
                    controls
                  />
                )}
                <p className="text-xs mt-1">{media.type} - {media.format}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaUploader;
