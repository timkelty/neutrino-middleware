# Neutrino stylelint Middleware

`@timkelty/neutrino-middleware-stylelint` is Neutrino middleware for linting styles using stylelint.

[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-downloads]][npm-url]
[![Join the Neutrino community on Spectrum][spectrum-image]][spectrum-url]

## Requirements

- Node.js v6.10+
- Yarn or npm client
- Neutrino v8

## Installation

`@timkelty/neutrino-middleware-stylelint` can be installed via the Yarn or npm clients.

#### Yarn

```bash
❯ yarn add @timkelty/neutrino-middleware-stylelint
```

#### npm

```bash
❯ npm install --save @timkelty/neutrino-middleware-stylelint
```

## Usage

`@timkelty/neutrino-middleware-stylelint` can be consumed from the Neutrino API, middleware, or presets. Require this package
and plug it into Neutrino:

```js
// Using function middleware format
const stylelint = require('@timkelty/neutrino-middleware-stylelint');

// Usage shows default values
neutrino.use(stylelint, {
  pluginId: 'stylelint',
  plugin: {
    files: '**/*.+(css|scss|sass|less)',
    context: neutrino.options.source,
    failOnError: neutrino.options.command !== 'start'
  }
});
```

- `stylelint`: An stylelint configuration object.
  - Use this to configure rules, plugins, and other [stylelint options](https://stylelint.io/user-guide/configuration).
  - This option is _not set_ by default, causing stylelint to search for a [config file](https://stylelint.io/user-guide/configuration/#loading-the-configuration-object).
- `plugin`: Options passed to `stylelint-webpack-plugin`. See the [stylelint Node API](https://stylelint.io/user-guide/node-api/#options) for all available options.

## Contributing

This middleware is part of the [neutrino-dev](https://github.com/mozilla-neutrino/neutrino-dev) repository, a monorepo
containing all resources for developing Neutrino and its core presets and middleware. Follow the
[contributing guide](https://neutrino.js.org/contributing) for details.

[npm-image]: https://img.shields.io/npm/v/@timkelty/neutrino-middleware-stylelint.svg
[npm-downloads]: https://img.shields.io/npm/dt/@timkelty/neutrino-middleware-stylelint.svg
[npm-url]: https://npmjs.org/package/@timkelty/neutrino-middleware-stylelint
[spectrum-image]: https://withspectrum.github.io/badge/badge.svg
[spectrum-url]: https://spectrum.chat/neutrino
