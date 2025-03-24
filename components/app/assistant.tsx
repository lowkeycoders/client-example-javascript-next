"use client";

import { useEffect } from "react";
import { useVapi } from "../../hooks/useVapi";
import { AssistantButton } from "./assistantButton";
import { Display } from "./display";
import { SpeakingAnimation } from "./speakingAnimation";

function Assistant() {
  const { toggleCall, callStatus, audioLevel, isSpeechActive } = useVapi();
  
  // Debug log when speech active state changes
  useEffect(() => {
    console.log(`Speech active state changed: ${isSpeechActive ? 'SPEAKING' : 'NOT SPEAKING'}`);
  }, [isSpeechActive]);
  return (
    <div className="flex flex-col h-full w-full max-w-4xl">
      <div className="chat-history flex-shrink-0 h-12 overflow-hidden">
        <Display />
      </div>
      <div className="assistant-animation-container flex justify-center items-center" style={{
        height: '500px', // Reduced height
        marginTop: '-20px', // Negative margin to pull it up
        marginBottom: '-20px' // Negative margin to reduce space below
      }}>
        <SpeakingAnimation 
          isAssistantSpeaking={isSpeechActive} 
          width={600} // Increased by 1.5x (400 * 1.5 = 600)
          height={600} // Increased by 1.5x (400 * 1.5 = 600)
          className="assistant-animation"
        />
      </div>
      <div className="user-input flex-shrink-0 flex justify-center" style={{
        position: 'relative', // Ensure it's in the flow
        zIndex: 10, // Make sure it's above other elements
        marginTop: '-30px' // Negative margin to pull it up significantly
      }}>
        <AssistantButton
          audioLevel={audioLevel}
          callStatus={callStatus}
          toggleCall={toggleCall}
        />
      </div>
    </div>
  );
}

export { Assistant };
