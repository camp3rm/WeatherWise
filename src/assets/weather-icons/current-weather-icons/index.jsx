const importAll = (r) => {
	const currentWeatherIcons = {};
	r.keys().forEach((key) => {
		const imageName = key.replace('./', '').replace(/\.\w+$/, '');
		currentWeatherIcons[imageName] = r(key);
	});
	return currentWeatherIcons;
};

export const currentWeatherIcons = importAll(require.context('../current-weather-icons', false, /\.(png|jpe?g|svg)$/));
