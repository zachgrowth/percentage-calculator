/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  output: 'standalone',
  poweredByHeader: false,
};

module.exports = nextConfig;
