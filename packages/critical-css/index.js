const merge = require('deepmerge');
const {omit, mapObjIndexed} = require('ramda');
const HtmlCriticalPlugin = require('html-critical-webpack-plugin');

module.exports = (neutrino, opts = {}) => {
  const options = merge({
    pluginId: 'critical',
    base: neutrino.options.output
  }, opts);

  const targets = [];

  // Add targets from root options
  if (options.src || options.html) {
    targets.push(options);

  // Add targets from @neutrinojs/web
  } else if (!options.targets) {
    const htmlPluginIds = Object.keys(neutrino.config.plugins.entries())
      .filter(pluginId => pluginId.startsWith('html-'));

    targets.push(...htmlPluginIds.map(pluginId => {
      const filename = neutrino.config.plugin(pluginId).get('args')[0].filename;

      return {
        pluginId: `${options.pluginId}-${pluginId}`,
        inline: true,
        src: filename,
        dest: filename
      };
    }));

  // Add targets from options.targets
  } else {
    targets.push(...Object.values(mapObjIndexed((target, pluginId) => {
      const targetOptions = typeof target === 'string' ? {
        src: target,
        dest: target
      } : target;

      return Object.assign(targetOptions, {
        pluginId: `${options.pluginId}-${pluginId}`,
      });
    }, options.targets)));
  }

  targets.forEach(target => {
    const pluginOptions = omit(['pluginId', 'targets'], merge(options, target));

    neutrino.config
      .plugin(target.pluginId)
      .use(HtmlCriticalPlugin, [pluginOptions]);
  });
};
