import NextBundleAnalyzer from '@next/bundle-analyzer';
const withBundleAnalyzer = NextBundleAnalyzer({ enabled: process.env.ANALYZE === 'true', })

/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        domains: ["guptvrindavandham.org", "scontent.cdninstagram.com"],
        minimumCacheTTL: 120
    },
    experimental: {
        amp: {
            skipValidation: true
        }
    },
    trailingSlash: true
};

export default withBundleAnalyzer(nextConfig);
