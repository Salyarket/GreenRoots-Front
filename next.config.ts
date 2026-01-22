import { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/uploads/**",
      },
    ],
  },
  rewrites: async () => [
    { source: "/api/:path*", destination: "http://localhost:4000/:path*" },
  ],
  typescript: {
    ignoreBuildErrors: true, // ignore les erreurs TS
  },
};

export default nextConfig;
