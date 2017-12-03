/* 
acourding:
	http://www.musicdsp.org/showArchiveComment.php?ArchiveID=26
	https://noisehack.com/custom-audio-effects-javascript-web-audio-api/
*/

export default function MoogSampler() {

	let in1 = 0;
	let in2 = 0;
	let in3 = 0;
	let in4 = 0;
	let out1 = 0;
	let out2 = 0;
	let out3 = 0;
	let out4 = 0;
	let fb = 0;
	let diff = 0;

	const pole = (input, output) => (
		0.3 * input +
		diff * output
	);


	return function sampleGenerate(inputSample, f, resonance) {

		let fpower = f ** 2;
		diff = 1 - f;
		
		fb = (resonance * 4) * (1.0 - 0.15 * fpower);
		inputSample -= out4 * fb;
		inputSample *= 0.35013 * (fpower ** 2);

		out1 = inputSample + pole(in1, out1); // Pole 1
		in1 = inputSample;

		out2 = out1 + pole(in2, out2); // Pole 2
		in2 = out1;

		out3 = out2 + pole(in3, out3); // Pole 3
		in3 = out2;

		out4 = out3 + pole(in4, out4); // Pole 4
		in4 = out3;

		return out4;
	};

}