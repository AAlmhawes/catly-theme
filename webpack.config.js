const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackRTLPlugin = require('rtlcss-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: {
      'app': './src/assets/js/salla-theme.js',
      'styles/main': './src/assets/styles/main.scss'
    },
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'js/[name].js',
      clean: true
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [require('autoprefixer')]
                }
              }
            },
            'sass-loader'
          ]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|webp)$/i,
          type: 'asset/resource',
          generator: { filename: 'images/[name][ext]' }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: { filename: 'fonts/[name][ext]' }
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/[name].css'
      }),
      new WebpackRTLPlugin({
        filename: 'css/[name].rtl.css'
      })
    ],
    optimization: {
      minimize: isProduction
    },
    devtool: isProduction ? false : 'source-map'
  };
};
