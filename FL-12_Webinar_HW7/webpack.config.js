const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'), // Folder to store generated bundle
    filename: 'js/app.js',  // Name of generated bundle after build
  },
  module: {  // where we defined file patterns and their loaders
      rules: [ 
          {
              test: /\.js$/,
              loader: 'babel-loader',
              exclude: [/node_modules/]
          },
          {
            test: /\.s[ca]ss$/,
            use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
          },
          {
            test: /\.(png|jpg|gif|jpeg|ico)$/,
            use: [
              { loader: "file-loader",
                options: {
                  outputPath: "img",
                  name: "[name].[ext]"
                }
              }
            ]
          }
          
      ]
  },
  plugins: [  // Array of plugins to apply to build chunk
    new HtmlWebpackPlugin({
        template: __dirname + "/src/index.html",
            inject: 'body'
    }),
    new MiniCssExtractPlugin({
        filename: "css/styles.css"
    }),
    new ImageminPlugin({
      test: /\.(jpg|png)$/
    })
  ],
  
};