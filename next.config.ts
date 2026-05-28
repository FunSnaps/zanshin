import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: 'img.spoonacular.com' }],
  },
};

export default nextConfig;
