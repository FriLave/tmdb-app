/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            hostname: 'image.tmdb.org',
            protocol: 'https',
        }],
    },
};

export default nextConfig;
