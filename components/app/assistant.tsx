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
      <div className="chat-history flex-shrink-0 overflow-hidden mb-4">
        <Display />
      </div>
      
      <div className="assistant-animation-container flex justify-center items-center" style={{
        height: '500px',
        position: 'relative'
      }}>
        <SpeakingAnimation 
          isAssistantSpeaking={isSpeechActive} 
          width={600}
          height={600}
          className="assistant-animation"
        />
        
        <div className="user-input absolute bottom-0 mb-4" style={{
          zIndex: 10
        }}>
          <AssistantButton
            audioLevel={audioLevel}
            callStatus={callStatus}
            toggleCall={toggleCall}
          />
        </div>
      </div>
    </div>
  );
}

export { Assistant };
