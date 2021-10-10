const { resolve } = require("path");

module.exports = ({ config, mode }) => {
  const rules = [
    {
      test: /\.(gif|jpe?g|png|svg)$/,
      use: {
        loader: "url-loader",
        options: { name: "[name].[ext]" },
      },
    },
    {
      test: /\.(png|jpe?g|gif|jp2|webp)$/,
      loader: "file-loader",
      options: {
        name: "images/[name].[ext]",
      },
    },

    {
      test: /\.s(a|c)ss$/,
      use: ["sass-loader"],
    }
  ];

  rules.forEach((rule) => config.module.rules.push(rule));

  // config.module.rules.push({
  //   test: /\.scss$/,
  //   use: ["style-loader", "css-loader", "sass-loader"],
  // });

  config.resolve.extensions = [
    ...config.resolve.extensions,
    ".web.js",
    ".js",
    ".json",
    ".web.jsx",
    ".jsx",
    ".ts",
    ".tsx",
  ];

  config.resolve.alias = {
    ...config.resolve.alias,
    v2: resolve(__dirname, "../src/v2"),
    components: resolve(__dirname, "../src/components"),
    lib: resolve(__dirname, "../src/lib"),
  };

  return config;
};
