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
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        // port: "*",
        // pathname: "/cdn/shop",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
    domains: [
      "assets.aceternity.com",
      "m.media-amazon.com",
      "krishna-twitter-dev.s3.ap-south-1.amazonaws.com",
    ],
  },
};

export default nextConfig;
