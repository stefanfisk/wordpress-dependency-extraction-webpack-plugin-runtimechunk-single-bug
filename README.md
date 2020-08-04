# WordPress Dependency Extraction Bug Reproduction

This repo reproduced bugs in `@wordpress/dependency-extraction-webpack-plugin` when used with `runtimeChunk: 'single'`.",

To reproduce, run `npm run build` and compare the dist directories.

## Unpredictable asset file filenames

The asset files are named `runtime.asset.php`, rather than `[name].asset.php` or similar based on the entrypoint name. This 

When using `output.filename = '[name]-[contenthash].js'`, the assets are named `runtime-[contenthash].asset.php`, making it is not possible to differentiate determine which asset file belongs to which entrypoint.

## All asset files are added as assets to the runtime chunk

The asset files are added to the runtime chuck, rather than to the individual entrypoint chunks. This makes it impossible to only load the dependencies for a single entrypoint, since the abose issue makes it impossible to determine which asset file belongs to which entrypoint.
