import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'carimagesapi.com',
      },
      {
        protocol: 'https',
        hostname: 'editorial.pxcrush.net',
      },
      {
        protocol: 'https',
        hostname: '**'
      }
    ], 
  }
};

export default nextConfig;
