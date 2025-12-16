export const checkImageExists = async (src: string): Promise<boolean> => {
  try {
    const response = await fetch(src, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

export const getOptimizedImageUrl = (src: string, width: number = 800) => {
  // Здесь можно добавить логику для оптимизации изображений через CDN
  // Например, Cloudinary или Imgix
  return src;
};

export const preloadImages = (imageUrls: string[]) => {
  if (typeof window === 'undefined') return;
  
  imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
};