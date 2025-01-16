import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.evangelizo.org",
        pathname: "/images/website/logo/**",
      },
    ],
  },
};

export default nextConfig;
