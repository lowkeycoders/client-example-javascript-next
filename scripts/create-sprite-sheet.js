const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

async function createSpriteSheet() {
  const imagesDir = path.join(__dirname, '../public/assets/animation');
  const outputPath = path.join(__dirname, '../public/assets/robot-sprite.png');
  
  // Get all robot image files and sort them correctly
  const files = fs.readdirSync(imagesDir)
    .filter(file => file.startsWith('robot') && file.endsWith('.png'))
    .sort((a, b) => {
      // Extract numbers from filenames for proper sorting
      const numA = parseInt(a.replace(/\D/g, ''));
      const numB = parseInt(b.replace(/\D/g, ''));
      return numA - numB;
    });

  if (files.length === 0) {
    console.error('No robot images found!');
    return;
  }

  // Load the first image to get dimensions
  const firstImage = await loadImage(path.join(imagesDir, files[0]));
  const frameWidth = firstImage.width;
  const frameHeight = firstImage.height;
  
  // Create a canvas for the sprite sheet
  // We'll arrange the images in a 5x5 grid (for 25 frames)
  const columns = 5;
  const rows = Math.ceil(files.length / columns);
  
  const canvas = createCanvas(frameWidth * columns, frameHeight * rows);
  const ctx = canvas.getContext('2d');

  // Draw each image onto the canvas
  for (let i = 0; i < files.length; i++) {
    const img = await loadImage(path.join(imagesDir, files[i]));
    const x = (i % columns) * frameWidth;
    const y = Math.floor(i / columns) * frameHeight;
    ctx.drawImage(img, x, y, frameWidth, frameHeight);
    console.log(`Added ${files[i]} to sprite sheet at position (${x}, ${y})`);
  }

  // Save the sprite sheet
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);
  
  console.log(`Sprite sheet created at ${outputPath}`);
  console.log(`Sprite sheet dimensions: ${canvas.width}x${canvas.height}`);
  console.log(`Frame size: ${frameWidth}x${frameHeight}`);
  console.log(`Grid: ${columns}x${rows}`);

  // Create a JSON metadata file with sprite sheet information
  const metadata = {
    width: canvas.width,
    height: canvas.height,
    frameWidth,
    frameHeight,
    columns,
    rows,
    frames: files.length
  };

  fs.writeFileSync(
    path.join(__dirname, '../public/assets/sprite-metadata.json'),
    JSON.stringify(metadata, null, 2)
  );
  console.log('Metadata file created');
}

createSpriteSheet().catch(console.error);
