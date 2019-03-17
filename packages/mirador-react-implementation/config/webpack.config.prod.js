const path = require('path')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const InterpolateHtmlPlugin = require('interpolate-html-plugin')
const eslintFormatter = require('react-dev-utils/eslintFormatter')
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const {StatsWriterPlugin} = require('webpack-stats-plugin')
const paths = require('./paths')
const getClientEnvironment = require('./env')

const publicPath = paths.servedPath
const publicUrl = publicPath.slice(0, -1)
const env = getClientEnvironment(publicUrl)

if (env.stringified['process.env'].NODE_ENV !== '"production"') {
  throw new Error('Production builds must have NODE_ENV=production.')
}

module.exports = {
  bail: true,
  entry: [require.resolve('./polyfills'), paths.appIndexJs],
  module: {
    rules: [
      {
        enforce: 'pre',
        include: paths.appSrc,
        test: /\.(js|jsx|mjs)$/,
        use: [{
          loader: require.resolve('eslint-loader'),
          options: {
            eslintPath: require.resolve('eslint'),
            formatter: eslintFormatter,
          },
        }],

      },
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
            use: [ MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader', ],
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
  node: {
    child_process: 'empty', dgram: 'empty', fs: 'empty', http2: 'empty', net: 'empty', tls: 'empty',
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
    runtimeChunk: 'single',
    splitChunks: {
      automaticNameDelimiter: '~',
      cacheGroups: {
        common: {
          chunks: 'initial',
          enforce: true,
          minChunks: 2,
          name: 'common',
          reuseExistingChunk: true,
        },
        vendors: {
          chunks: 'all',
          reuseExistingChunk: true,
          test: /[\\/]node_modules[\\/](react|react-dom|searchkit|@firebase|openseadragon|lodash|snapsvg-cjs)[\\/]/,
        },
      },
      chunks: 'all',
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      minChunks: 1,
      minSize: 0,
      name: true,
    },
  },
  output: {
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    filename: 'static/js/[name].[chunkhash:8].js',
    path: paths.appBuild,
    publicPath,
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      inject: true,
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
      template: paths.appHtml,
    }),
    new MiniCssExtractPlugin({
      chunkFilename: '[chunkhash:8].css',
      filename: '[name].[contenthash].css',
    }),
    new InterpolateHtmlPlugin(env.raw),
    new StatsWriterPlugin({
      fields: null,
      filename: 'stats.json',
      stats: 'normal'
    }),
    new webpack.DefinePlugin(env.stringified),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
    }),
  ],
  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx', '.tsx', '.ts'],
    modules: ['node_modules', paths.appNodeModules].concat(
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)),
    plugins: [
      new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson])],
  },
}
