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
	
};

lib.fm = lib.sine;

export default lib;