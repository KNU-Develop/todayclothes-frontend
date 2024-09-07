/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    instrumentationHook: true,
  },
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },

  webpack(config, { isServer }) {
    if (isServer) {
      config.resolve.alias['msw/browser'] = false
    } else {
      config.resolve.alias['msw/node'] = false
    }

    return config
  },
}

export default nextConfig
