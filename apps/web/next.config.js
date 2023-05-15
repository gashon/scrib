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
  async rewrites() {
    const HOST = process.env.API_BASE_URL ?? 'http://localhost:7000'; //env
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
