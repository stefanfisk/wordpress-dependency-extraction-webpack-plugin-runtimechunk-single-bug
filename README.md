# WordPress Dependency Extraction Bug Reproduction

This repo reproduced bugs in `@wordpress/dependency-extraction-webpack-plugin` when used with `runtimeChunk: 'single'`.",

`./src/entry1.js` imports `@wordpress/i18n`, and `./src/entry2.js` imports `@wordpress/autop`.

## Issues

### Unpredictable asset file filenames

The asset files are named `runtime.asset.php`, rather than `[name].asset.php` or similar based on the entrypoint name. This 

When using `output.filename = '[name]-[contenthash].js'`, the assets are named `runtime-[contenthash].asset.php`, making it is not possible to differentiate determine which asset file belongs to which entrypoint.

### All asset files are added as assets to the runtime chunk

The asset files are added to the runtime chuck, rather than to the individual entrypoint chunks. This makes it impossible to only load the dependencies for a single entrypoint, since the abose issue makes it impossible to determine which asset file belongs to which entrypoint.

## Expected Behaviour

The asset files should be named according to the entrypoint names, and only be added to the entrypoint chunks.

## To Reproduce

To reproduce, run `npm run build` and compare the dist directories. `manifest.json` contains an easy to read summary of what files and assets belong to which entrypoint and chunk.

## dist

Built with separate runtime chunks per entrypoint.

The asset files are correctly named and added to the entrypoints' assets.

## dist-single

Built with `optimizations.runtimeChunk: 'single'`.

Because the asset files for `entry1` and `entry2` both are named `runtime.asset.php`, the `entry2` asset file overwrites that for `entry1`.

`runtime.asset.php` is also added twice to the entrypoint assets, once for each entrypoint.

## dist-single-filename-contenthash

Built with `optimizations.runtimeChunk: 'single'` and `output.filename = '[name]-[contenthash].js'`.

The asset files are named `runtime-[contenthash].asset.php`, and it is not possible to distinguis between them.

Both asset files are added to the shared runtime chunk, making it impossible to determine which asset file should be used for a specific entrypoint.
