import { useEffect, useRef, useState } from 'react';

interface SpeakingAnimationProps {
  isAssistantSpeaking: boolean;
  width?: number;
  height?: number;
  className?: string;
}

// This is a CSS-based animation component that uses either:
// 1. A sprite sheet (if available) for optimal performance
// 2. Individual images as a fallback with CSS animations
export const SpeakingAnimation: React.FC<SpeakingAnimationProps> = ({
  isAssistantSpeaking,
  width = 200,
  height = 200,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [useFallback, setUseFallback] = useState(true);
  const [currentFrame, setCurrentFrame] = useState(1);
  const totalFrames = 25;
  
  // Check if sprite sheet exists and set fallback mode accordingly
  useEffect(() => {
    const checkSpriteSheet = () => {
      const img = new Image();
      img.onload = () => setUseFallback(false);
      img.onerror = () => setUseFallback(true);
      img.src = '/assets/robot-sprite.png';
    };
    
    checkSpriteSheet();
  }, []);
  
  // Handle animation with requestAnimationFrame for smoother performance
  useEffect(() => {
    let animationFrameId: number | null = null;
    let lastFrameTime = 0;
    const frameInterval = 100; // ms between frames
    
    const animate = (timestamp: number) => {
      if (!lastFrameTime) lastFrameTime = timestamp;
      
      const elapsed = timestamp - lastFrameTime;
      
      if (elapsed > frameInterval) {
        setCurrentFrame(prev => (prev % totalFrames) + 1);
        lastFrameTime = timestamp;
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    if (isAssistantSpeaking && useFallback) {
      // Start animation loop
      animationFrameId = requestAnimationFrame(animate);
    }
    
    return () => {
      // Clean up animation
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isAssistantSpeaking, useFallback]);
  
  // This effect handles CSS class changes for animation control
  useEffect(() => {
    console.log('🔄 SpeakingAnimation: isAssistantSpeaking changed to', isAssistantSpeaking);
    const container = containerRef.current;
    if (!container) return;
    
    if (isAssistantSpeaking) {
      // When assistant starts speaking, start the animation
      container.classList.add('active');
      container.classList.remove('inactive');
      if (!useFallback) {
        container.classList.add('playing');
      }
      console.log('🎬 Animation started - using ' + (useFallback ? 'fallback mode' : 'sprite sheet'));
    } else {
      // When assistant stops speaking, stop the animation
      container.classList.remove('active');
      container.classList.add('inactive');
      if (!useFallback) {
        container.classList.remove('playing');
      }
      // Reset to first frame when stopped
      setCurrentFrame(1);
      console.log('⏹️ Animation stopped');
    }
  }, [isAssistantSpeaking, useFallback]);

  // Preload all robot images for smoother animation
  useEffect(() => {
    // Preload sprite sheet
    const spriteSheet = new Image();
    spriteSheet.src = '/assets/robot-sprite.png';
    
    // Also preload individual frames as fallback
    const preloadImages = () => {
      for (let i = 1; i <= totalFrames; i++) {
        const img = new Image();
        const frameNum = i.toString().padStart(2, '0');
        img.src = `/assets/animation/robot0${frameNum}.png`;
      }
    };
    
    preloadImages();
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`animation-container ${className} ${isAssistantSpeaking ? 'active' : 'inactive'}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {useFallback ? (
        // Fallback: Use individual images with CSS transitions
        <img
          src={`/assets/animation/robot0${currentFrame.toString().padStart(2, '0')}.png`}
          alt={isAssistantSpeaking ? "Assistant is speaking" : "Assistant is not speaking"}
          width={width}
          height={height}
          className={`animation-image ${isAssistantSpeaking ? 'active' : 'inactive'}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out, filter 0.3s ease-in-out',
            transform: isAssistantSpeaking ? 'scale(1.1)' : 'scale(0.9)',
            opacity: isAssistantSpeaking ? 1 : 0.5,
            filter: isAssistantSpeaking ? 'none' : 'grayscale(100%)'
          }}
        />
      ) : (
        // Sprite sheet version (CSS animation)
        <div
          className={`sprite-animation ${isAssistantSpeaking ? 'playing' : ''}`}
          style={{ 
            width: `${width}px`, 
            height: `${height}px`,
          }}
          aria-label={isAssistantSpeaking ? "Assistant is speaking" : "Assistant is not speaking"}
        />
      )}
    </div>
  );
};
