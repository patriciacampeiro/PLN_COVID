/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: process.env.BACKEND_INTERNAL_URL || 'http://localhost:8080/api/v1/:path*',
      },
      {
        source: '/api/nlp/:path*',
        destination: process.env.NLP_INTERNAL_URL || 'http://localhost:8000/api/nlp/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
