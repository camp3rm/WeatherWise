const importAll = (r) => {
	const wind = {};
	r.keys().forEach((key) => {
		wind[key.replace('./', '')] = r(key);
	});
	return wind;
}
export const windDirectionImages = importAll(require.context('../wind-direction-images', false, /\.(png|jpe?g|svg)$/));

