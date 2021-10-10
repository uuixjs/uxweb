const {resolve} = require('path');

module.exports = ({config, mode}) => {
  config.module.rules.push({
    test: /\.(gif|jpe?g|png|svg)$/,
    use: {
      loader: 'url-loader',
      options: {name: '[name].[ext]'},
    },
  });

  config.module.rules.push({
    test: /\.(png|jpe?g|gif|jp2|webp)$/,
    loader: 'file-loader',
    options: {
      name: 'images/[name].[ext]',
    },
  });

  config.module.rules.push({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
    include: resolve(__dirname, '../'),
  });

  config.resolve.extensions = [
    '.web.js',
    '.js',
    '.json',
    '.web.jsx',
    '.jsx',
    'ts',
    'tsx',
  ];

  config.resolve.alias = {
    ...config.resolve.alias,
    'v2/*': resolve(__dirname, '../src/v2/*'),
    'lib/*': resolve(__dirname, '../src/lib/*'),
  };

  return config;
};
