/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "green-roots-front-six.vercel.app",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
