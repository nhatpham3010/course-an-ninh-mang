export const getConfig = () => {
  return {
    apiUrl: import.meta.env.VITE_API_URL,
    webName: import.meta.env.VITE_WEB_NAME,
    cloudinary: {
      cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
      uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
      uploadFolder: import.meta.env.VITE_CLOUDINARY_UPLOAD_FOLDER || "uploads",
    },
  };
};
