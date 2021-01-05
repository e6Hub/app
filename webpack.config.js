module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ['babel-loader', 'vue-svg-loader'],
      },
    ],
  },
};