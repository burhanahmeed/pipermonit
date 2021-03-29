module.exports = {
  webpack: (config, options, webpack) => {
    // Perform customizations to config
    // Important: return the modified config
    config.entry.main = "./backend/index.ts";
    config.resolve = {
      extensions: [".ts", ".js", ".json"]
    }
    config.module.rules.push(
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      }
    );
    return config;
  },
};