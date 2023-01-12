const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

module.exports = (env, argv) => {
  const ENV = argv.mode || 'development'
  return {
    entry: {
      bundle: './src/main.js'
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, ENV === 'development' ? 'dist' : 'dist/projects/battleShip'),
      publicPath: ''
    },
    mode: ENV,
    devtool: ENV === 'production' ? undefined : 'inline-source-map',
    devServer: {
      static: './dist'
    },
    optimization: {
      minimize: ENV === 'production',
      runtimeChunk: 'single'
    },
    module: {
      rules: [
        {
          test: /.(p?css|postcss)$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: ''
              }
            },
            'css-loader',
            'postcss-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'imgs/[name][ext]'
          }
        },
        {
          test: /.(html)$/,
          type: 'asset/resource',
          generator: {
            filename: '[name][ext]',
            outputPath: './'
          }
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'styles.css'
      }),
      new webpack.EnvironmentPlugin({
        NODE_ENV: ENV
      })
    ]
  }
}
