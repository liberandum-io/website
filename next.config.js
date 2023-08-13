const withNextIntl = require('next-intl/plugin')(
  './src/i18n.ts'
);
const withMDX = require('@next/mdx')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'imagedelivery.net'
    ],
  },
  experimental: {
    appDir: true,
    mdxRs: true,
  }
}

module.exports = withNextIntl(withMDX(nextConfig));
