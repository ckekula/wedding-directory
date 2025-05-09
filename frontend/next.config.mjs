/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "multi-vendor-wedding-directory.s3.ap-south-1.amazonaws.com",
        port: "",
        pathname: "/**", // all paths under this hostname are allowed
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/**", // all paths under this hostname are allowed
      },
      {
        protocol: "http",
        hostname: "51.79.145.226",
        port: "5000",
        pathname: "/**",
      },
    ],
  },
  optimizeFonts: false,
  output: "standalone",
};

export default nextConfig;
