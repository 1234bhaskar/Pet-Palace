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
    domains: ["assets.aceternity.com","m.media-amazon.com"]
  },
};

export default nextConfig;
