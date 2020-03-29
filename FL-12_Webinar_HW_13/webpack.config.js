const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'), // Folder to store generated bundle
    filename: 'js/bundle.js',  // Name of generated bundle after build
  },
  module: {  // where we defined file patterns and their loaders
      rules: [ 
          {
            test: /\.s[ca]ss$/,
            use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
          },
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
  ],
  
};