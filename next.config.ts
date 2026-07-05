import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
      { protocol: "https", hostname: "lamora-bckt.s3.us-east-2.amazonaws.com" },
      // AWS_S3_HOSTNAME
    ],
  },
};

export default nextConfig;
