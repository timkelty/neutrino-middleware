module.exports = {
  use: [
    [
      '@neutrinojs/eslint', {
        include: [
          '.*.js',
          'packages/*/*.js',
        ],
        eslint: {
          baseConfig: {
            extends: [
              '@fusionary/eslint-config'
            ]
          },
        }
      }
    ]
  ]
};
