import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function uploadImage(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  const base64Image = `data:${file.type};base64,${buffer.toString('base64')}`;
  
  const response = await cloudinary.uploader.upload(base64Image, {
    folder: 'wellpeer_reccs',
  });
  
  return response.secure_url;
}
