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
    index: './src/index.tsx',
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
    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx', '.tsx', '.ts'],
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
        oneOf: [
          {
            exclude: /node_modules/,
            loader: require.resolve('ts-loader'),
            test: /\.tsx?$/,
          },
          {
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000, name: 'static/media/[name].[hash:8].[ext]',
            },
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          },
          {
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: {
              compact: true,
            },
            test: /\.(js|jsx|mjs)$/,
          },
          {
            test: /\.(sa|sc|c)ss$/,
            use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', ],
          },
          {
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
    strictExportPresence: true,
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
