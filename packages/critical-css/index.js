const merge = require('deepmerge');
const { join } = require('path');
const HtmlCriticalPlugin = require('html-critical-webpack-plugin');

module.exports = (neutrino, opts = {}) => {
  const options = merge({
    pluginId: 'stylelint',
    base: neutrino.options.output,
  }, opts);

  neutrino.config
    .plugin(options.pluginId)
    .use(HtmlCriticalPlugin, [options]);
};
