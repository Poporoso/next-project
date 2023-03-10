/** @type {import('next').NextConfig} 
  reactStrictMode: true,*/
const nextConfig = {
  i18n: {
    locales: ['it', 'en', 'es'],
    defaultLocale: 'it',
  },
  trailingSlash: true,
  images: {
    domains: ["www.andylab.it"],
    formats: ["image/avif", "image/webp"],
  },
}
module.exports = nextConfig