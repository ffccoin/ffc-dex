/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.coingecko.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.moralis.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "tokens.1inch.io",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
