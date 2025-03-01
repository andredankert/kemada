import { type NextApiRequest, type NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const galleryDir = path.join(process.cwd(), 'public', 'images', 'gallery');
    const files = fs.readdirSync(galleryDir);
    
    // Filter for image files
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif)$/i.test(file)
    );

    return res.status(200).json({ images: imageFiles });
  } catch (error) {
    console.error('Error reading gallery directory:', error);
    return res.status(500).json({ message: 'Error loading gallery images' });
  }
} 