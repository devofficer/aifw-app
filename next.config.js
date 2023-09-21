/** @type {import('next').NextConfig} */
const webpack = require("webpack");

const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      "pbxt.replicate.delivery",
      "replicate.delivery",
      "gahzjqtdotgyqjbkirfu.supabase.co",
    ],
  },
  webpack: (config, options) => {
    config.resolve.fallback = {
      buffer: require.resolve("buffer"),
      net: false,
      tls: false,
    };
    config.plugins.push(
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
      }),
      new webpack.NormalModuleReplacementPlugin(/node:/, (resource) => {
        const mod = resource.request.replace(/^node:/, "");
        switch (mod) {
          case "buffer":
            resource.request = "buffer";
            break;
          default:
            throw new Error(`Not found ${mod}`);
        }
      })
    );
    config.ignoreWarnings = [/Failed to parse source map/];
    return config;
  },
};

module.exports = nextConfig;
