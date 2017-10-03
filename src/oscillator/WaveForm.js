export default function WaveForm(WaveIndex, wave) {

	let { sine, square, saw, saw2, noise, tech } = wave;

	let mixin = 0;
	let i = 0;

	if (sine) {
		mixin += sine * Math.sin(WaveIndex * Math.PI * 2);
		i += sine;
	}
	if (square) {
		mixin += square * (Number(WaveIndex > 0.7) * 2 - 1);
		i += square;
	}
	if (saw) {
		mixin += saw * (1 - WaveIndex * 2);
		i += saw;
	}
	if (saw2) {
		mixin += saw2 * (1 - ((WaveIndex * 2) % 1) * 2);
		i += saw2;
	}
	if (noise) {
		mixin += noise * (1 - Math.random() * 2);
		i += noise;
	}

	if (tech) {
		let wave = 0;
		if (WaveIndex < 0.15) {
			wave = Math.min((0.05 - WaveIndex % 0.05) * 50 - 0.7, 1);
		}
		mixin += wave * tech;
		i += tech;
	}

	if (i === 0) {
		return 0;
	}
	// mix
	return (mixin / (i + 1));
}