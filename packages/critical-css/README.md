# Neutrino Critical CSS Middleware

`neutrino-middleware-critical-css` is Neutrino middleware for extracting and inlining critical css.

[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-downloads]][npm-url]
[![Join the Neutrino community on Spectrum][spectrum-image]][spectrum-url]

## Requirements

- Node.js v6.10+
- Yarn or npm client
- Neutrino v8

## Installation

`neutrino-middleware-critical-css` can be installed via the Yarn or npm clients.

#### Yarn

```bash
❯ yarn add neutrino-middleware-critical-css
```

#### npm

```bash
❯ npm install --save neutrino-middleware-critical-css
```

## Usage

`neutrino-middleware-critical-css` can be consumed from the Neutrino API, middleware, or presets. Require this package
and plug it into Neutrino:

```js
// Simple example html from @neutrinojs/web
module.exports = {
  use: [
    '@neutrinojs/web',
    'neutrino-middleware-critical-css'
  ],
};
```

```js
// Example showing specified targets.
module.exports = {
  use: [
    '@neutrinojs/web',
    ['neutrino-middleware-critical-css', {
      targets: {

        // String values will set src and dest to the same value.
        home: 'index.html',

        somepage: {
          src: 'somepage.html',
          dest: 'somepage.html'
        }
      }
    }]
  ],
};
```

```js
// Server-side app example
module.exports = {
  use: [
    ['@neutrinojs/web', {
      html: false
    }],
    ['neutrino-middleware-critical-css', {
      targets: {
        home: {
          src: 'http://localhost:8089',
          dest: 'critical-home.css'
        },
        somepage: {
          src: 'http://localhost:8089/somepage',
          dest: 'critical-somepage.css'
        }
      }
    }]
  ],
};

```

Without specifying `src`, `html`, or `targets` options, the middleware will automatically look for
any html generated by `@neutrinojs/web` and automatically inline it to your template.

## Options

Options are passed to [Critical](https://github.com/addyosmani/critical) via [HTML Critical Webpack Plugin](https://github.com/anthonygore/html-critical-webpack-plugin).

| Name             | Type               | Default | Description   |
| ---------------- | ------------------ | ------------- |------------- |
| `pluginId`       | `string`           | 'critical' | The plugin ID used by Neutrino |
| `targets`        | `object`           | | Object properties will be prefixed with the `pluginId` option and used as the Neutrino plugin IDs. Values will be passed as options for [Critical](https://github.com/addyosmani/critical#options).
| `base`           | `string`           | `neutrino.options.output` | See [Critical](https://github.com/addyosmani/critical#options) |

For all other options, see [Critical's options](https://github.com/addyosmani/critical#options).

By specifying `targets`, you can invoke Critical on multiple targets.
Specified options will be merged with root level options and passed on to Critical.

[npm-image]: https://img.shields.io/npm/v/neutrino-middleware-critical-css.svg
[npm-downloads]: https://img.shields.io/npm/dt/neutrino-middleware-critical-css.svg
[npm-url]: https://npmjs.org/package/neutrino-middleware-critical-css
[spectrum-image]: https://withspectrum.github.io/badge/badge.svg
[spectrum-url]: https://spectrum.chat/neutrino
