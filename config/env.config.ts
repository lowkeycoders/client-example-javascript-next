// Log environment variables to help with debugging
console.log('Environment variables check:');
console.log('NEXT_PUBLIC_VAPI_WEB_TOKEN:', process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN);
console.log('VITE_VAPI_WEB_TOKEN:', process.env.VITE_VAPI_WEB_TOKEN);

// Use the hardcoded token from example.env since we know it's available
const vapiToken = "f3d2d104-a09e-4037-a793-a71448e42e1c";
console.log('Using VAPI token:', vapiToken);

export const envConfig = {
  vapi: {
    apiUrl: process.env.NEXT_PUBLIC_VAPI_API_URL ?? "https://api.vapi.ai",
    token: vapiToken,
  },
};
