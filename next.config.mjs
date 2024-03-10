/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/api/swap", // Routes this applies to
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // or process.env.ALLOWED_ORIGIN
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
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
    ],
  },
};

export default nextConfig;
