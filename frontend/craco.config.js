module.exports = {
  style: {
    postcss: {
      plugins: [
        require('autoprefixer'),
        require('postcss-preset-env')({
          stage: 3,
          features: {
            'nesting-rules': true
          }
        })
      ]
    }
  }
};
