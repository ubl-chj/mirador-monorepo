const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const paths = require('../config/paths');
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  devtool: 'inline-source-map',
  entry: {
    index: './src/index-component.js',
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    path: paths.appBuild,
    libraryTarget: 'umd',
    library: 'Mirador',
  },
  resolve: {
    alias: {
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
    },
    extensions: ['.js'],
    symlinks: false
  },
  externals: {
    // Don't bundle react or react-dom
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "React",
      root: "React"
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "ReactDOM",
      root: "ReactDOM"
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: require.resolve('react-dev-utils/eslintFormatter'),
              eslintPath: require.resolve('eslint'),

            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        include: paths.appSrc,
      },
      {
        test: /\.(js|mjs|jsx)$/,
        include: paths.appSrc,
        loader: require.resolve('babel-loader'),
        options: {
          plugins: [
            [
              require.resolve('babel-plugin-named-asset-import'),
              {
                loaderMap: {
                  svg: {
                    ReactComponent: '@svgr/webpack?-prettier,-svgo![path]',
                  },
                },
              },
            ],
          ],
          cacheDirectory: true,
          // Save disk space when time isn't as important
          cacheCompression: true,
          compact: true,
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        extractComments: true,
        parallel: true,
        sourceMap: false
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
      }),
    ],
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /@blueprintjs\/(core|icons)/, // ignore optional UI framework dependencies
    }),
    new MiniCssExtractPlugin({
      chunkFilename: '[chunkhash:8].css',
      filename: 'vendors.css',
    }),
  ]
};
