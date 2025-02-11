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
        hostname: process.env.NEXT_SUPABASE_HOST as string,
        pathname: "/storage/v1/object/public/app_images/**",
      },
      {
        protocol: "https",
        hostname: process.env.NEXT_SUPABASE_HOST as string, // Get Supabase host from environment variable
        pathname: "/storage/v1/object/sign/user_images/**", // Allow all user images with a signed URL
      },
    ],
  },
};

export default nextConfig;
