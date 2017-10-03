const Sine = i => Math.sin(i * Math.PI * 2);
const Square = i => Number(i > 0.5) * 2 - 1;
const Saw = i => 1 - i * 2;
const Saw2 = i => 1 - ((i * 2) % 1) * 2;
const Noise = () => 1 - Math.random() * 2;
const Tech = (i) => {

	if (i > 0.15) {
		return 0;
	}
	return Math.min((0.05 - i % 0.05) * 50 - 0.7, 1);
	
};

export default function WaveForm(waveIndex, wave) {

	let { sine, square, saw, saw2, noise, tech } = wave;
	let mixin = 0;
	let i = 0;

	if (sine) {
		mixin += sine * Sine(waveIndex);
		i += sine;
	}
	if (square) {
		mixin += square * Square(waveIndex);
		i += square;
	}
	if (saw) {
		mixin += saw * Saw(waveIndex);
		i += saw;
	}

	if (saw2) {
		mixin += saw2 * Saw2(waveIndex);
		i += saw2;
	}

	if (noise) {
		mixin += noise * Noise();
		i += noise;
	}

	if (tech) {
		mixin += Tech(waveIndex) * tech;
		i += tech;
	}

	if (i === 0) {
		return 0;
	}
	// mix
	return (mixin / (i + 1));

}