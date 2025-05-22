import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Desactiva optimización de imágenes para evitar dependencia de sharp
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
