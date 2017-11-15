var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var basePath = __dirname;

module.exports = {
  context: path.join(basePath, "src"),
  resolve: {
      extensions: ['.js', '.ts', '.tsx']
  },

  entry: [
    './main.tsx',
    '../node_modules/bootstrap/dist/css/bootstrap.css'    
  ],
  output: {
    path: path.join(basePath, 'dist'),
    filename: 'bundle.js'
  },

  devtool: 'source-map',

  devServer: {
       contentBase: './dist', // Content base
       inline: true, // Enable watch and live reload
       host: 'localhost',
       port: 8080,
       stats: 'errors-only'
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
        options: {
          useBabel: true,
        }
      },
      {
        test: /\.css$/,        
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: {
            loader: 'css-loader',
          },
        }),
      },
      // Loading glyphicons => https://github.com/gowravshekar/bootstrap-webpack
      // Using here url-loader and file-loader
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },  
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      },                
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },      
    ]
  },
  plugins: [
    // Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html', // Name of file in ./dist/
      template: 'index.html', // Name of template in ./src
      hash: true
    }),
    new ExtractTextPlugin({
      filename: '[chunkhash].[name].css',
      disable: false,
      allChunks: true,
    }),
  ]
}
