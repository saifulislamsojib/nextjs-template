/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  compress: false, // disable gzip compression, it should be handled by nginx/traefik
};

export default nextConfig;
