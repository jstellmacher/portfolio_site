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
      {
        protocol: 'https',
        hostname: 'img.icons8.com', // Added this line to allow images from icons8
      },
    ],
    dangerouslyAllowSVG: true, // Add this line to allow SVG images
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}
export default nextConfig