/**
 * Cloudinary Upload Utility
 * Handles client-side file uploads to Cloudinary using upload preset (no signature needed)
 */
import { getConfig } from "../configs/getConfig.config";

/**
 * Upload file to Cloudinary using upload preset (simpler, no signature needed)
 * @param {File} file - File to upload
 * @param {Object} options - Upload options
 * @param {string} options.folder - Folder path in Cloudinary (optional)
 * @param {string} options.resourceType - Resource type: image, video, raw, auto (default: image)
 * @returns {Promise<Object>} - Upload result with secure_url
 */
export const uploadToCloudinary = async (file, options = {}) => {
  try {
    const { folder = null, resourceType = "image" } = options;
    const { cloudinary } = getConfig();

    if (!cloudinary.cloudName || !cloudinary.uploadPreset) {
      throw new Error("Thiếu cấu hình Cloudinary. Vui lòng kiểm tra file .env (cần VITE_CLOUDINARY_CLOUD_NAME và VITE_CLOUDINARY_UPLOAD_PRESET)");
    }

    const uploadFolder = folder || cloudinary.uploadFolder;

    // Create FormData for Cloudinary upload
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", cloudinary.uploadPreset);
    
    // Add folder if specified
    if (uploadFolder) {
      formData.append("folder", uploadFolder);
    }

    // Upload directly to Cloudinary using upload preset
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudinary.cloudName}/${resourceType}/upload`;

    const response = await fetch(cloudinaryUrl, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || "Failed to upload file");
    }

    const data = await response.json();
    console.log("Cloudinary upload response:", data); // Debug log

    if (!data.secure_url) {
      throw new Error("Upload thành công nhưng không nhận được URL từ Cloudinary");
    }

    return {
      url: data.secure_url,
      publicId: data.public_id,
      format: data.format,
      width: data.width,
      height: data.height,
      bytes: data.bytes,
    };
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error(
      error.message || "Lỗi khi upload file lên Cloudinary"
    );
  }
};

/**
 * Upload payment proof image
 * @param {File} file - Image file
 * @returns {Promise<Object>} - Upload result with secure_url
 */
export const uploadPaymentProof = async (file) => {
  const { cloudinary } = getConfig();
  return uploadToCloudinary(file, {
    folder: cloudinary.uploadFolder,
    resourceType: "image",
  });
};

