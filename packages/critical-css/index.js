const merge = require('deepmerge');
const {omit} = require('ramda');
const HtmlCriticalPlugin = require('html-critical-webpack-plugin');

module.exports = (neutrino, opts = {}) => {
  const options = merge({
    pluginId: 'critical',
    base: neutrino.options.output
  }, opts);

  // Add html targets from @neutrinojs/web
  if (!options.src && !options.html && !options.targets) {
    Object.assign(options, {
      targets: Object.keys(neutrino.config.plugins.entries())
        .filter(pluginId => pluginId.startsWith('html-'))
        .map(pluginId => {
          const filename = neutrino.config.plugin(pluginId).get('args')[0].filename;

          return {
            inline: true,
            src: filename,
            dest: filename,
            pluginId: `${options.pluginId}-${pluginId}`
          };
        })
    });
  }

  const targets = (options.targets || [options])
    .map((target, index) => {
      if (!target.pluginId && index > 0) {
        Object.assign(target, {
          pluginId: `${options.pluginId}-${index}`
        });
      }

      return merge(
        omit('targets', options),
        target
      );
    });

  targets.forEach((target, index) => {
    neutrino.config
      .plugin(target.pluginId)
      .use(HtmlCriticalPlugin, [omit('pluginId', target)]);
  });
};
