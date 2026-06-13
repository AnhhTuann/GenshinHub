import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**', // This allows any path under the hostname
      },
      {
        protocol: 'https',
        hostname: 'genshin.jmp.blue',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static.wikia.nocookie.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'enka.network',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'gi.yatta.moe',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'genshin-impact.fandom.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  output: 'standalone',
  webpack: (config, {dev}) => {
    // HMR is disabled in AI Studio via DISABLE_HMR env var.
    // Do not modifyâ€”file watching is disabled to prevent flickering during agent edits.
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
};

import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

export default withNextIntl(nextConfig);
