const path = require('path');

module.exports = function override(config) {
	config.resolve.alias = {
		...config.resolve.alias,
		'@components': path.resolve(__dirname, 'src/components'),
		'@src': path.resolve(__dirname, 'src'),
		'@pages': path.resolve(__dirname, 'src/pages'),
		'@assets': path.resolve(__dirname, 'src/assets'),
		'@utils': path.resolve(__dirname, 'src/utils'),
		'@providers': path.resolve(__dirname, 'src/providers'),
		'@constants': path.resolve(__dirname, 'src/constants'),
	};
	return config;
};
