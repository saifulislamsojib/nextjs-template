import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typedRoutes: true,
  output: 'standalone',
  compress: false,
};

export default nextConfig;
