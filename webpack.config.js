const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './public'),
    filename: '[name]-[hash].bundle.js'  
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public')  
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          { loader: 'vue-loader' }
        ]
      },
      {
        test: /\.js$/,
        use: [
          { loader: 'babel-loader' }
        ]
      },
      {
        test: /\.s?css$/,
        use: [
          { loader: 'vue-style-loader' },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              prependData: `
                $compiler: 'webpack';
                @import "${path.resolve(__dirname, "./src/stylesheets/reset.scss")}";
                @import "${path.resolve(__dirname, "./src/stylesheets/application.scss")}";
              `,
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.pug$/,
        use: [
          { loader: 'pug-plain-loader' }
        ]  
      },
      // image のローダー設定
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        include: [
          path.resolve(__dirname, './src/images')
        ],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          }
        ]
      },
      {
        test: /.(svg|woff|woff2|ttf|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          }
        ]
      }
    ]  
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    }
  },
  plugins: [new VueLoaderPlugin()]
}
