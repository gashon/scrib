const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true,
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  experimental: {
    transpilePackages: ['@scrib/config/tsconfig', '@scrib/ui'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  poweredByHeader: false,
  eslint: { ignoreDuringBuilds: true },
  async rewrites() {
    const HOST = 'http://localhost:7000'; //env
    return [
      {
        source: '/ajax/:path*',
        destination: `${HOST}/ajax/:path*`,
      },
      {
        source: '/api/:path*',
        destination: `${HOST}/api/:path*`,
      },
    ];
  },
});
