import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,

  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
};

export default nextConfig;
