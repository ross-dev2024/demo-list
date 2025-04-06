module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto",
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    }
  }
} 