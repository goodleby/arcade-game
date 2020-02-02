const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const defs = {
    sourcemap: {
      development: 'source-map'
    },
    usehash: {
      production: true
    },
    chunking: {
      production: true
    }
  };
  return {
    entry: {
      index: './src/index.js'
    },
    mode: argv.mode || 'production',
    devtool: (env && env.sourcemap) || defs.sourcemap[argv.mode] || false,
    output: {
      filename:
        (env && env.usehash) || defs.usehash[argv.mode]
          ? '[name].[contenthash:6].js'
          : '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({template: path.resolve(__dirname, './src/index.html')}),
      new MiniCssExtractPlugin({
        filename:
          (env && env.usehash) || defs.usehash[argv.mode]
            ? '[name].[contenthash:6].css'
            : '[name].bundle.css'
      })
    ],
    module: {
      rules: [
        {
          test: /\.js$/i,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                plugins: [
                  [
                    'module-resolver',
                    {
                      root: ['./'],
                      alias: {
                        assets: './assets/',
                        images: './assets/images/',
                        fonts: './assets/fonts/',
                        src: './src/',
                        components: './src/components/'
                      }
                    }
                  ]
                ]
              }
            }
          ]
        },
        {test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/i, use: ['file-loader']},
        {
          test: /\.(css|sass|scss)$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: true
              }
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: (env && !!env.sourcemap) || !!defs.sourcemap[argv.mode]
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: loader => {
                  const plugins = [require('postcss-preset-env')()];
                  if (env && env.mode === 'production') plugins.push(require('cssnano'));
                  return plugins;
                }
              }
            },
            'sass-loader'
          ]
        }
      ]
    },
    devServer: {
      contentBase: './dist',
      hot: true
    },
    optimization:
      (env && env.chunking) || defs.chunking[argv.mode]
        ? {
            runtimeChunk: 'single',
            moduleIds: 'hashed',
            splitChunks: {
              cacheGroups: {
                vendor: {
                  test: /[\\/]node_modules[\\/]/,
                  name: 'modules',
                  chunks: 'all'
                }
              }
            }
          }
        : {}
  };
};
