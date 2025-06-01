/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        appDir: true,
        serverActions: true,
    },
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: ['i.pinimg.com',],
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;