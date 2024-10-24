/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '10.10.1.2',
        port: '8080',
        pathname: '/images_socios/**',
      },
      {
        protocol: 'http',
        hostname: 'cimnet.com',
        pathname: '/fotocarnet/**',
      },
    ],
  },
};

export default nextConfig;
