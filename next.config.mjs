/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
};

console.log('Next.js config:', {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || ''
});

export default nextConfig;
