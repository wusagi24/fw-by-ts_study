module.exports = {
  entry: './src/index.ts',

  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /.vue$/,
        use: {
          loader: 'vue-loader',
          query: {
            loaders: {
              js: 'awesome-typescript-loader',
            },
          },
        },
      },
      {
        test: /\.ts$/,
        use: 'awesome-typescript-loader'
      },
      {
        // ソースマップファイルの処理
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
    ]
  },

  resolve: {
    extensions: [
      '.ts',
      '.js',
      '.vue'
    ],
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },

  devtool: 'source-map'
};
