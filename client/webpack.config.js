var ExtractTextPlugin = require('extract-text-webpack-plugin');

config = {
  entry: "./src/app.js",
  output: {
    filename: "bundle.js",
    path: "./build"
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module:{
    loaders: [
      {
        test: /(\.js|\.jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /(\.scss|\.css)$/,
        loader: ExtractTextPlugin.extract('css!sass')
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('public/style.css', { allChunks: true })
  ],
  devtool: 'source-map'
}

module.exports = config;

