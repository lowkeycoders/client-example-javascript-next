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
    <>
      <div className="chat-history">
        <Display />
      </div>
      <div className="assistant-animation-container" style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        margin: '20px 0',
        minHeight: '600px' // Increased to accommodate the larger animation
      }}>
        <SpeakingAnimation 
          isAssistantSpeaking={isSpeechActive} 
          width={600} // 4x the original width (150 * 4 = 600)
          height={600} // 4x the original height (150 * 4 = 600)
          className="assistant-animation"
        />
      </div>
      <div className="user-input">
        <AssistantButton
          audioLevel={audioLevel}
          callStatus={callStatus}
          toggleCall={toggleCall}
        ></AssistantButton>
      </div>
    </>
  );
}

export { Assistant };
