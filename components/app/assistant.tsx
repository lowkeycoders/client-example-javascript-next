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
      <div className="chat-history flex-shrink-0 h-24 overflow-hidden">
        <Display />
      </div>
      <div className="assistant-animation-container flex-grow flex justify-center items-center" style={{
        maxHeight: '600px'
      }}>
        <SpeakingAnimation 
          isAssistantSpeaking={isSpeechActive} 
          width={500} // Slightly reduced to ensure it fits on all screens
          height={500} // Slightly reduced to ensure it fits on all screens
          className="assistant-animation"
        />
      </div>
      <div className="user-input flex-shrink-0 mt-4 flex justify-center">
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
