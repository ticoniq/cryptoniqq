/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    staleTimes: {
      dynamic: 30,
    },
  },
  serverExternalPackages: ["@node-re/argon2"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/*`,
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/support/:path*',
        has: [
          {
            type: 'host',
            value: 'support.cryptoniq.tech',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
