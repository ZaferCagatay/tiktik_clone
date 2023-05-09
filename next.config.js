/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  images: {
    domains: ['www.linkpicture.com', 'lh3.googleusercontent.com'],
  },
};

module.exports = nextConfig;
