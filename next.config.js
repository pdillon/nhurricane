/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'www.nhc.noaa.gov',
            port: '',
            pathname: '/xgtwo/*.png',
          },
        ],
      },
}

module.exports = nextConfig
