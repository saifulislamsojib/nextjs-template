import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typedRoutes: true,
  reactCompiler: true,
  output: 'standalone',
  compress: false,
};

export default nextConfig;
