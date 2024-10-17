
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'multi-vendor-wedding-directory.s3.ap-south-1.amazonaws.com',
              port: '',
              pathname: '/**', // all paths under this hostname are allowed
            },
        ],
    },
    optimizeFonts: false,
};
  
export default nextConfig;

  