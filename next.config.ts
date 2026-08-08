import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    qualities: [75, 90, 100],
  },
  async rewrites() {
    return [
      {
        source: "/api/proxy/:path*",
        destination: "`${process.env.NEXT_PUBLIC_API_URL}/:path*`",
      },
    ];
  },
};

export default nextConfig;
