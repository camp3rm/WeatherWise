const importAll = (r) => {
	const wind = {};
	r.keys().forEach((key) => {
		wind[key.replace('./', '')] = r(key);
	});
	return wind;

}
export const WindDirection = importAll(require.context('../assets/weather-icons/wind-direction', false, /\.(png|jpe?g|svg)$/));