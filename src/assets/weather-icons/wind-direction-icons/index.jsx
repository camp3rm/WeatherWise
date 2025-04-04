const importAll = (r) => {
	const wind = {};
	r.keys().forEach((key) => {
		wind[key.replace('./', '')] = r(key);
	});
	return wind;
}
export const windDirectionIcons = importAll(require.context('../wind-direction-icons', false, /\.(png|jpe?g|svg)$/));

