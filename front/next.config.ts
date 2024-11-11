import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',  
        pathname: '**/*.(jpg|jpeg|png|webp|gif|bmp)',  
      },
      {
        protocol: 'http',
        hostname: '**',  
        pathname: '**/*.(jpg|jpeg|png|webp|gif|bmp)',  
      },
    ],
  },
};

export default nextConfig;
