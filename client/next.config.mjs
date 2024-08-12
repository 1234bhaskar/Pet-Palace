/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "supertails.com",
        // port: "*",
        // pathname: "/cdn/shop",
      },
    ],
  },
};

export default nextConfig;
