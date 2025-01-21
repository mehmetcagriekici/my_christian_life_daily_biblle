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
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_SUPABASE_HOST as string,
        pathname: "/storage/v1/object/public/app_images/**",
      },
    ],
  },
};

export default nextConfig;
