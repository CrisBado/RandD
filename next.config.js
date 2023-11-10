/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    esmExternals: "loose",
    serverComponentsExternalPackages: ["mongoose"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: "asset/resource",
    });

    config.experiments = {
      topLevelAwait: true,
      layers: true, // Enable layers
    };

    return config;
  },
};
