/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['categories.olxcdn.com', 'localhost', 'olx.pl']
  },
  experimental: {
    appDir: true,
    transpilePackages: [],
    fontLoaders: [{ loader: '@next/font/google', options: { subsets: ['latin'] } }]
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack']
    })
    return config
  }
}
