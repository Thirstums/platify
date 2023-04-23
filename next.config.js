/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
}

module.exports = {
  nextConfig, 
  images: {
    unoptimized: true
  }

}