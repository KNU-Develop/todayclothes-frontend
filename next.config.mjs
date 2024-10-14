/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
    ]
  },
  experimental: {
    instrumentationHook: true,
  },
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'todayclothes-file.s3.ap-northeast-2.amazonaws.com',
        pathname: '/clothes/**',
      },
    ],
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
