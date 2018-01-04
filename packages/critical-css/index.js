const merge = require('deepmerge');
const { omit } = require('ramda');
const HtmlCriticalPlugin = require('html-critical-webpack-plugin');

module.exports = (neutrino, opts = {}) => {
  const options = merge({
    pluginId: 'critical',
    base: neutrino.options.output
  }, opts);

  const targets = (options.targets || [options])
    .map((target, index) => {
      if (!target.pluginId && index > 0) {
        Object.assign(target, {
          pluginId: `${options.pluginId}-${index}`
        });
      }
      console.log(options);
      return merge(
        omit('targets', options),
        target
      );
    });

  // console.log(targets);
  targets.forEach((target, index) => {
    neutrino.config
      .plugin(target.pluginId)
      .use(HtmlCriticalPlugin, [omit('pluginId', target)]);
  });
};
