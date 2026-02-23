/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "quizakos.gr",
          },
        ],
        destination: "https://www.quizakos.gr/:path*",
        permanent: true, // 301
      },
    ];
  },
};

export default nextConfig;
