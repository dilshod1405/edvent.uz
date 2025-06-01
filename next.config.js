/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,  // agar bor bo‘lsa
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',  // i.pinimg.com dan rasm olish
        pathname: '/**',  // barcha yo‘nalishlar
      },
    ],
  },
};

module.exports = nextConfig;
