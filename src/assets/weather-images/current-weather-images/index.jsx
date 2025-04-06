const importAll = (r) => {
	const currentWeatherImages = {};
	r.keys().forEach((key) => {
		const imageName = key.replace('./', '').replace(/\.\w+$/, '');
		currentWeatherImages[imageName] = r(key);
	});
	return currentWeatherImages;
};

export const currentWeatherImages = importAll(require.context('../current-weather-images', false, /\.(png|jpe?g|svg)$/));
