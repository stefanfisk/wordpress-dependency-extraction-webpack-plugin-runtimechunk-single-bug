const { BundleAnalyzerPlugin } = require( 'webpack-bundle-analyzer' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );

const config = {
	mode: 'development',
	entry: {
        entry1: './src/entry1',
        entry2: './src/entry2',
	},
	output: {},
	plugins: [
        new CleanWebpackPlugin(),
        new DependencyExtractionWebpackPlugin(),
        new BundleAnalyzerPlugin({
			analyzerMode: 'json',
			generateStatsFile: true,
			statsFilename: 'manifest.json',
			statsOptions: {
				assets: false,
				assetsByChunkName: false,
				chunkGroups: false,
				chunkModules: false,
				chunkRelations: false,
				modules: false,
			},
        }),
	],
	optimization: {},
};

module.exports = config;
