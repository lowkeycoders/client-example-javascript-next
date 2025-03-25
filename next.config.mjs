/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // When using a base path, we need to ensure all assets are served from the same path
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  // The assetPrefix ensures all assets are requested with the correct path
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
  // This is critical for handling static assets correctly with the Nginx setup
  trailingSlash: true,
};

console.log('Next.js config:', {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
  trailingSlash: true
});

export default nextConfig;
