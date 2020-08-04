const config = require('./webpack.config.single');

config.output.path = __dirname + '/dist-single-and-filename-contenthash';

config.output.filename = '[name]-[contenthash].js';

module.exports = config;
