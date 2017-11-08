const path = require('path');

module.exports = (neutrino, options = {}) => {
  const isProduction = neutrino.options.env.NODE_ENV === 'production';
  const isBuild = neutrino.options.command === 'build';
  const urlLoaderOptions = {
    name: isBuild ? '[name].[hash].[ext]' : '[name].[ext]',
  };

  options = Object.assign({
    cleanOnStart: true,
    baseUrl: `/${path.basename(neutrino.options.output)}/`,
  }, options);

  options.web = Object.assign({
    devServer: {
      publicPath: options.baseUrl,
      proxy: {
        '**': {
          target: options.devServerProxy,
          changeOrigin: true,
        },
      },
    },
  }, options.web || {});

  neutrino.use('neutrino-preset-web', options.web);
  neutrino.use('neutrino-middleware-image-loader', {
    svg: urlLoaderOptions,
    img: urlLoaderOptions,
  });

  if (options.cleanOnStart) {
    neutrino.on('prestart', () => {
      neutrino.use('neutrino-middleware-clean', {
        paths: [neutrino.options.output]
      });
    });
  }

  neutrino.config
  .output
    .set('publicPath', options.baseUrl)
    .end()
  .plugins
    .delete('html')
    .delete('script-ext')
    .end()
  .plugin('manifest')
    .use(require('webpack-manifest-plugin'))
    .end();
};
