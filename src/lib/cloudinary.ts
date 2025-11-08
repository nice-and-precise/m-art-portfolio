// Cloudinary integration utilities
// Last updated: 2025-11-08

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface UploadResult {
  url: string;
  publicId: string;
  width: number;
  height: number;
}

/**
 * Upload image to Cloudinary
 * @param file - Base64 data URL or file path
 * @param folder - Cloudinary folder (default: 'pottery')
 */
export async function uploadImage(
  file: string,
  folder: string = 'pottery'
): Promise<UploadResult> {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder,
      transformation: [
        { width: 2000, crop: 'limit' }, // Max width 2000px
        { quality: 'auto' }, // Auto quality optimization
        { fetch_format: 'auto' }, // Auto format (WebP, AVIF)
      ],
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image');
  }
}

/**
 * Delete image from Cloudinary
 */
export async function deleteImage(publicId: string): Promise<boolean> {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === 'ok';
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    return false;
  }
}

/**
 * Generate responsive image URL
 */
export function getResponsiveUrl(
  publicId: string,
  width: number = 800
): string {
  return cloudinary.url(publicId, {
    width,
    crop: 'limit',
    quality: 'auto',
    fetch_format: 'auto',
  });
}

export default cloudinary;
