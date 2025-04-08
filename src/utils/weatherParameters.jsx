export const pressureLevels = [
	{ min: -Infinity, max: 981, label: "Very low pressure" },
	{ min: 981, max: 1011, label: "Low pressure" },
	{ min: 1011, max: 1021, label: "Normal pressure" },
	{ min: 1021, max: 1041, label: "High pressure" },
	{ min: 1041, max: Infinity, label: "Very high pressure" },
];

export const humidityLevels = [
	{ min: -Infinity, max: 21, label: "Critically Low" },
	{ min: 21, max: 31, label: "Too Low" },
	{ min: 31, max: 41, label: "Lower bound" },
	{ min: 41, max: 51, label: "Comfortable" },
	{ min: 51, max: 61, label: "Comfortable (in Summer)" },
	{ min: 61, max: 71, label: "Too High" },
	{ min: 71, max: Infinity, label: "Critically High" },
];

export const uvLevels = [
	{ min: 0, max: 3, label: "Low", color: "green" },
	{ min: 3, max: 6, label: "Moderate", color: "yellow" },
	{ min: 6, max: 8, label: "High", color: "orange" },
	{ min: 8, max: 11, label: "Very high", color: "red" },
	{ min: 11, max: Infinity, label: "Extreme", color: "violet" },
];

export const visibilityLevels = [
	{ min: 0, max: 0.5, label: "Dangerous" },
	{ min: 0.5, max: 1, label: "Poor" },
	{ min: 1, max: 5, label: "Average" },
	{ min: 5, max: 10, label: "Good" },
	{ min: 10, max: Infinity, label: "Clear" },
];

export const cloudinessLevels = [
	{ min: 0, max: 11, label: "Cloudless" },
	{ min: 11, max: 25, label: "Few clouds" },
	{ min: 25, max: 50, label: "Scattered clouds" },
	{ min: 50, max: 84, label: "Broken clouds" },
	{ min: 84, max: 101, label: "Overcast" },
];

export const windDirections = [
	{ min: 0, max: 23, label: "N", image: "north.png" },
	{ min: 23, max: 68, label: "NE", image: "north-east.png" },
	{ min: 68, max: 113, label: "E", image: "east.png" },
	{ min: 113, max: 158, label: "SE", image: "south-east.png" },
	{ min: 158, max: 203, label: "S", image: "south.png" },
	{ min: 203, max: 248, label: "SW", image: "south-west.png" },
	{ min: 248, max: 293, label: "W", image: "west.png" },
	{ min: 293, max: 338, label: "NW", image: "north-west.png" },
	{ min: 338, max: 361, label: "N", image: "north.png" },
];
