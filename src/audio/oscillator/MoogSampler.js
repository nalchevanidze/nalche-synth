/* 
acourding:
	http://www.musicdsp.org/showArchiveComment.php?ArchiveID=26
	https://noisehack.com/custom-audio-effects-javascript-web-audio-api/
*/
export default function MoogSampler() {
	let frequency = 0;
	let diff = 0;
	const input = new Float32Array(5);
	const output = new Float32Array(5);
	output.fill(0);
	input.fill(0);
	const pole = (index) => (
		0.3 * input[index] +
		diff * output[index]
	);
	return function sampleGenerate(inputSample, f, resonance) {
		let fpower = f ** 2;
		diff = 1 - f;
		frequency = (resonance * 4) * (1.0 - 0.15 * fpower);
		inputSample -= output[4] * frequency;
		output[0] = inputSample * (0.35013 * (fpower ** 2));
		for (let i = 0; i < 5; i++) {
			let i2 = i + 1;
			output[i2] = output[i] + pole(i2);
			input[i2] = output[i];
		}
		return output[4];
	};
}