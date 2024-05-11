/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'clif-notes-profile-pictures.s3.amazonaws.com'
            }
        ]
    }
};

module.exports = nextConfig;
