/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'categories.olxcdn.com',
        port: '',
        pathname: '/assets/categories/olxpl/**'
      }
    ]
  },
  experimental: {
    appDir: true,
    transpilePackages: [],
    fontLoaders: [{ loader: '@next/font/google', options: { subsets: ['latin'] } }]
  },

  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack']
    }),
      (config.experiments = { ...config.experiments, ...{ topLevelAwait: true } })
    return config
  }
}
