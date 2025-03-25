import { useEffect, useRef, useState } from 'react';

interface SpeakingAnimationProps {
  isAssistantSpeaking: boolean;
  width?: number;
  height?: number;
  className?: string;
}

export const SpeakingAnimation: React.FC<SpeakingAnimationProps> = ({
  isAssistantSpeaking,
  width = 200,
  height = 200,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(1);
  const totalFrames = 25; // We have 25 frames (robot01.png to robot025.png)
  
  // Reference to store all loaded images
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const animationRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number>(0);
  
  // Preload all images at component mount
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;
    let errorCount = 0;
    
    const onImageLoad = (index: number) => {
      console.log(`✅ Successfully loaded image ${index}`);
      loadedCount++;
      checkAllLoaded();
    };
    
    const onImageError = (index: number, path: string) => {
      console.error(`❌ Failed to load image ${index}: ${path}`);
      // Try to fetch the image directly to see if it exists
      fetch(path)
        .then(response => {
          if (!response.ok) {
            console.error(`Image ${index} fetch failed with status: ${response.status}`);
          } else {
            console.log(`Image ${index} exists but failed to load as an Image object`);
          }
        })
        .catch(error => {
          console.error(`Network error fetching image ${index}: ${error}`);
        });
      
      errorCount++;
      // If we can't load an image, still proceed if we have at least 75% of images
      checkAllLoaded();
    };
    
    const checkAllLoaded = () => {
      // Consider images loaded if all are loaded or if we've tried all and have at least 75% success
      if (loadedCount + errorCount === totalFrames && loadedCount > 0) {
        const successRate = loadedCount / totalFrames;
        console.log(`🎬 Animation frames loaded: ${loadedCount}/${totalFrames} (${(successRate * 100).toFixed(1)}%)`);
        if (successRate >= 0.75 || loadedCount >= 10) {
          setImagesLoaded(true);
          // Filter out any images that failed to load
          const validImages = images.filter(img => img.complete && img.naturalWidth > 0);
          imagesRef.current = validImages;
          console.log(`🎬 Using ${validImages.length} valid images for animation`);
        }
      }
    };
    
    // Load all images in parallel
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      
      // Format the path correctly based on the actual file naming convention
      // For 1-9: robot01.png to robot09.png
      // For 10+: robot010.png to robot025.png
      const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
      let imagePath: string = `${basePath}/assets/animation/robot0${i}.png`;
      
      // Note: Both branches use the same format since the file naming is consistent
      // We're keeping the if statement for clarity and future-proofing if the format changes
      
      // Debug output with full URL for easier debugging
      const fullUrl = new URL(imagePath, window.location.origin).href;
      console.log(`🔄 Loading image ${i}: ${fullUrl}`);
      
      // Add a timestamp to prevent caching issues
      const cacheBuster = `?t=${Date.now()}`;
      img.src = imagePath + cacheBuster;
      img.onload = () => onImageLoad(i);
      img.onerror = () => onImageError(i, imagePath);
      images.push(img);
    }
    
    return () => {
      // Clean up by removing event listeners
      images.forEach(img => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [totalFrames]);
  
  // Set up canvas for high-DPI displays
  useEffect(() => {
    if (!imagesLoaded) return;
    
    const setupCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      // Get the device pixel ratio
      const dpr = window.devicePixelRatio || 1;
      
      // Get the size of the canvas in CSS pixels
      const rect = canvas.getBoundingClientRect();
      
      // Set the canvas width and height taking into account the device pixel ratio
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      // Scale the context to ensure correct drawing operations
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
    };
    
    setupCanvas();
    window.addEventListener('resize', setupCanvas);
    
    return () => {
      window.removeEventListener('resize', setupCanvas);
    };
  }, [imagesLoaded]);
  
  // Handle animation with requestAnimationFrame
  useEffect(() => {
    if (!imagesLoaded) {
      console.log('🚫 Animation not started: Images not loaded yet');
      return;
    }
    
    console.log(`🎬 Animation ready with ${imagesRef.current.length} images`);
    const frameInterval = 80; // ms between frames
    
    const renderFrame = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Get the device pixel ratio
      const dpr = window.devicePixelRatio || 1;
      
      // Get the size of the canvas in CSS pixels
      const rect = canvas.getBoundingClientRect();
      
      // Clear canvas
      ctx.clearRect(0, 0, rect.width, rect.height);
      
      // Draw current frame
      const img = imagesRef.current[currentFrame - 1];
      if (img) {
        // Center the image and scale it to fit while maintaining aspect ratio
        const scale = Math.min(rect.width / img.width, rect.height / img.height) * 0.9;
        const x = (rect.width - img.width * scale) / 2;
        const y = (rect.height - img.height * scale) / 2;
        
        // Use better image rendering for smoother animations
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      }
    };
    
    // Initial render
    renderFrame();
    
    const animate = (timestamp: number) => {
      if (!lastFrameTimeRef.current) lastFrameTimeRef.current = timestamp;
      
      const elapsed = timestamp - lastFrameTimeRef.current;
      
      if (elapsed > frameInterval) {
        // Update frame
        setCurrentFrame(prev => (prev % totalFrames) + 1);
        lastFrameTimeRef.current = timestamp;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start or stop animation based on isAssistantSpeaking
    if (isAssistantSpeaking) {
      console.log('🎬 Starting animation - Assistant is speaking');
      animationRef.current = requestAnimationFrame(animate);
    } else {
      console.log('🛑 Stopping animation - Assistant is not speaking');
      // If not speaking, reset to first frame
      setCurrentFrame(1);
      renderFrame();
    }
    
    return () => {
      // Clean up animation
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [isAssistantSpeaking, imagesLoaded, currentFrame, totalFrames]);
  
  // Apply visual effects based on speaking state
  const containerStyle: React.CSSProperties = {
    width: `${width}px`,
    height: `${height}px`,
    position: 'relative',
    transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
    transform: isAssistantSpeaking ? 'scale(1.05)' : 'scale(1)',
    opacity: isAssistantSpeaking ? 1 : 0.7,
  };
  
  const canvasStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    filter: isAssistantSpeaking ? 'brightness(1.1)' : 'brightness(0.9) grayscale(50%)',
    transition: 'filter 0.3s ease-in-out',
  };

  return (
    <div 
      className={`animation-container ${className} ${isAssistantSpeaking ? 'active' : 'inactive'}`}
      style={containerStyle}
      aria-label={isAssistantSpeaking ? "Assistant is speaking" : "Assistant is not speaking"}
    >
      {!imagesLoaded && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          width: '100%', 
          height: '100%',
          color: '#888' 
        }}>
          Loading...
        </div>
      )}
      <canvas 
        ref={canvasRef} 
        width={width} 
        height={height}
        style={{
          ...canvasStyle,
          display: imagesLoaded ? 'block' : 'none'
        }}
      />
    </div>
  );
};
