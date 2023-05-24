const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true,
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  transpilePackages: ['@scrib/config/tsconfig', '@scrib/ui'],
  typescript: {
    ignoreBuildErrors: true,
  },
  poweredByHeader: false,
  eslint: { ignoreDuringBuilds: true },
  images: {
    domains: [
      'localhost',
      'scrib-app.s3.amazonaws.com',
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com',
    ],
  },
  async rewrites() {
    const HOST =
      process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:7000'; //env
    return [
      {
        source: '/ajax/:path*',
        destination: `${HOST}/ajax/:path*`,
      },
      {
        source: '/graphql',
        destination: `${HOST}/graphql`,
      },
      {
        source: '/api/:path*',
        destination: `${HOST}/api/:path*`,
      },
    ];
  },
});
