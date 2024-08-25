/**
 * Resizes a base64 PNG image to a maximum size of 400px by 300px while maintaining aspect ratio,
 * and returns the resized image as a JPEG blob.
 * @param base64Image The base64 encoded PNG image.
 * @returns A Promise that resolves to a Blob of the resized image in JPEG format.
 */
export function resizeBase64ImageToJPEGBlob(base64Image: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    // Create an Image object
    const img = new Image();

    // Set up event listeners for image loading
    img.onload = () => {
      // Constants for desired max width and height
      const maxWidth = 800;
      const maxHeight = 600;

      // Calculate the correct size maintaining the aspect ratio
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height = Math.round(height * (maxWidth / width));
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round(width * (maxHeight / height));
          height = maxHeight;
        }
      }

      // Create a canvas element to manipulate the image
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        // Draw the image with the new dimensions
        ctx.drawImage(img, 0, 0, width, height);

        // Convert canvas content to a blob in JPEG format
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject('Blob creation failed');
          }
        }, 'image/jpeg', 0.85); // Specify JPEG format and quality
      } else {
        reject('Failed to get canvas context');
      }
    };

    img.onerror = (error) => {
      reject(`Image loading error: ${error}`);
    };

    // Start loading the image
    img.src = base64Image;
  });
}

// Usage: pass a base64 encoded PNG string to this function.
// resizeBase64ImageToJPEGBlob(base64String).then(blob => {
//   // Handle the JPEG blob here, e.g., for download or upload
// });
