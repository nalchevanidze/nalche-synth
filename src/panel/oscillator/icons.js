function FunctionalWave(func) {
	return "M" + Array.from(
		{
			length: 40
		},
		(e, i) => (30 + i) + " " + (30 + func(i / 40) * 40)
		
	);
}
function rescale(vector) {
	return "M" + vector.map(
		value => 30 + value * 40
	);
}
const lib = {
	saw: rescale( [0, 0.5, 0, 0, 1, 1, 1, 0.5]) ,
	square: rescale( [0, 0.5, 0, 0, 0.5, 0, 0.5, 1, 1, 1, 1, 0.5]),
	saw2: rescale([0, 0.5, 0, 0, 0.5, 1, 0.5, 0, 1, 1, 1, 0.5]),
	noise: FunctionalWave(Math.random) ,
	sine: FunctionalWave(e => Math.sin(e * 2 * Math.PI) / 2 + 0.5),
	tech: FunctionalWave(i => {
		let wave = 0.5;
		if (i < 0.15) wave = Math.min((0.05 - i % 0.05) * 50 - 0.7, 1) - 0.5;
		return wave;
	}),
	fmFreq: rescale([0, 0.5, 0, 0, 0.5, 1, 0.5, 0, 1, 1, 1, 0.5]),
	cutoff: "M25.03 34s11 .365 18.093-.415c7.092-.78 8.077-.095 12.153 5.524 4.075 5.618 19.06 29.97 19.06 29.97",
	resonance: "M25.86 65.488s17.086.177 24.168-30.246c6.56 30.48 25.135 29.14 25.135 29.14"
};

lib.fm = lib.sine;

export default lib;