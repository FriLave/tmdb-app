import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin(
  './lib/i18n.ts'
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: "image.tmdb.org",
        protocol: "https",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
