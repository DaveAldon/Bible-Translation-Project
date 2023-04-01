/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    esmExternals: 'loose',
  },
  images: {
    domains: [
      'github.com',
      'i.pravatar.cc',
      'raw.githubusercontent.com',
      'images.pexels.com',
      'supabase.com',
    ],
  },
}

module.exports = nextConfig
