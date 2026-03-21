import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
        ],
    },
    experimental: {
        // helps stabilize RSC fetch during fast navigations
        staleTimes: {
        dynamic: 30,
        },
    },
};

export default nextConfig;