import Vapi from "@vapi-ai/web";
import { envConfig } from "@/config/env.config";
import { AddMessage, MessageTypeEnum } from "./types/conversation.type";

console.log('Initializing VAPI SDK with token:', envConfig.vapi.token);

let vapiInstance;

try {
  // Initialize the VAPI SDK with the token
  vapiInstance = new Vapi(envConfig.vapi.token);
  
  // Add global error handler for VAPI SDK
  vapiInstance.on('error', (error) => {
    console.error('VAPI SDK Error:', error);
  });
} catch (error) {
  console.error('Error initializing VAPI SDK:', error);
  // Create a dummy vapi object to prevent app from crashing
  vapiInstance = {
    start: () => {
      console.error('VAPI SDK failed to initialize. Cannot start call.');
      return Promise.reject('VAPI SDK initialization failed');
    },
    stop: () => {},
    on: () => {},
    off: () => {},
    send: (message: AddMessage) => {
      console.error('VAPI SDK failed to initialize. Cannot send message:', message);
    }
  };
}

export const vapi = vapiInstance;
