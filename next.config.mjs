/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'skillicons.dev',
      },
    ],
    dangerouslyAllowSVG: true, // Add this line to allow SVG images
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}
export default nextConfig