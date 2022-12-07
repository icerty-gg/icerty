/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    transpilePackages: [],
    fontLoaders: [{ loader: '@next/font/google', options: { subsets: ['latin'] } }]
  }
}
