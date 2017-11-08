const path = require('path');

module.exports = (neutrino, options = {}) => {
  const isProduction = neutrino.options.env.NODE_ENV === 'production';
  const isBuild = neutrino.options.command === 'build';

  neutrino.use('neutrino-middleware-stylelint', {
    config: require(path.join(neutrino.options.root, '.stylelintrc.js')),
  });

  neutrino.use('neutrino-middleware-eslint', {
    eslint: {
      useEslintrc: true,
    },
  });

  neutrino.use('neutrino-middleware-postcss', {
    config: {
      path: neutrino.options.root,
      ctx: {
        baseUrl: `/${path.basename(neutrino.options.output)}/`,
        basePath: neutrino.options.source,
      }
    },
  });

  // https://github.com/webpack-contrib/extract-text-webpack-plugin
  neutrino.use('neutrino-preset-extractstyles', {
    plugin: {
      filename: isBuild ? '[name].[contenthash].css' : '[name].css',
      allChunks: true,
      ignoreOrder: true,
    }
  });

  /**
   * neutrino.config
   * https://github.com/mozilla-neutrino/webpack-chain
   */

  // neutrino.config.module.rule('compile').include.add(/fmjs/);

  neutrino.config.resolve.modules
    .add(neutrino.options.source);

  neutrino.config
  .when(isProduction, (config) => {
    config.plugin('minify').tap(() => [{
      removeConsole: true,
      removeDebugger: true,
    }]);

    config.module.rule('img').use('img').loader(require.resolve('img-loader'));
  });
};
