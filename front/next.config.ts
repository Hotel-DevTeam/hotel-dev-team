import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "villa-rosarito.hotels-argentina.net",
        pathname: "/data/Pics/OriginalPhoto/**/*",
      },
      {
        protocol: "https",
        hostname: "boutique-villa-rosarito.hotels-argentina.net",
        pathname: "/data/Pics/OriginalPhoto/**/*",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**",
        pathname: "**/*.(jpg|jpeg|png|webp|gif|bmp)",
      },
      {
        protocol: "http",
        hostname: "**",
        pathname: "**/*.(jpg|jpeg|png|webp|gif|bmp)",
      },
    ],
  },
};

export default nextConfig;
