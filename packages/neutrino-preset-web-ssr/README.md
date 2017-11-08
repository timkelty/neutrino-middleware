# Neutrino Web SSR Preset

[neutrino-preset-web](https://neutrino.js.org/presets/neutrino-preset-web/) is generally geared toward toward single-page apps, as it uses `html-webpack-template` to generate your html templates.

This package extends `neutrino-preset-web`, tweaking it for apps that rely on SSR (server-side rendering).

## Features

- Removes `html-webpack-template`
- Serves your built assets from a directory in your web-root. (e.g. your `neutrino.options.output` may be `public/build`).
- Makes use of `webpack-manifest-plugin`, so your server-side templates have a method to reference your built assets.

### While developing (`neutrino start`):

- Requests will proxy your SSR app, with the exception of your neutrino assets.
- Assets will be in predictable location (not-revved), so they can be referenced by your server-side app.

## Options

The following shows how you can pass an options object to the preset and override its options, showing the defaults:

```js
module.exports = {
  use: [
    ['neutrino-preset-web-ssr', {

      // The address of your SSR app to proxy requests to (e.g. 'http://localhost:3000').
      // You may set this option directly, or via the `DEV_SERVER_PROXY` env var.
      devServerProxy: process.env.DEV_SERVER_PROXY,

      // The base URL for your neutrino assets. Should end in a slash. By default this is derived from `neutrino.options.output` (e.g. '/build/')
      baseUrl: `/${path.basename(neutrino.options.output)}/`,

      // By default, the `neutrino.options.output` dir will be cleaned on `neutrino start`. This can be used as a mechanism for your SSR app to determine if it should serve revved or non-revved assets.
      cleanOnStart: true,

      // Pass any options to neutrino-preset-web
      web: {

      }
    }
  ]
};
```
