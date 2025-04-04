const path = require('path');

module.exports = function override(config) {
	config.resolve.alias = {
		...config.resolve.alias,
		'@components': path.resolve(__dirname, 'src/components'),
		'@assets': path.resolve(__dirname, 'src/assets'),
		'@utils': path.resolve(__dirname, 'src/utils'),
		'@FetchingAPI': path.resolve(__dirname, 'src/FetchingAPI'),
	};
	return config;
};
