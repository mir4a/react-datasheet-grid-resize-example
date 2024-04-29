/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, options) {
    // Ensures source maps are enabled
    config.devtool = "source-map";

    // Return the updated config
    return config;
  },
};

export default nextConfig;
