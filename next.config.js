/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,  
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'clif-notes-profile-pictures.s3.amazonaws.com'
            },
            {
                protocol: 'https',
                hostname: 'cart-dart-menus.s3.amazonaws.com'
            }
        ]
    }
};

module.exports = nextConfig;
