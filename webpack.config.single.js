const config = require('./webpack.config');

config.output.path = __dirname + '/dist-single';

config.optimization.runtimeChunk = 'single';

module.exports = config;
