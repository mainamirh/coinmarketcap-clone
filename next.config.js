/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: [
      "s3.coinmarketcap.com",
      "img-cdn.magiceden.dev",
      "s2.coinmarketcap.com",
    ],
  },
};

module.exports = nextConfig;
