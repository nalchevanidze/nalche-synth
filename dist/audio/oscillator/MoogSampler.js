"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = MoogSampler;
/* 
acourding:
	http://www.musicdsp.org/showArchiveComment.php?ArchiveID=26
	https://noisehack.com/custom-audio-effects-javascript-web-audio-api/
*/

function MoogSampler() {

	var in1 = 0;
	var in2 = 0;
	var in3 = 0;
	var in4 = 0;
	var out1 = 0;
	var out2 = 0;
	var out3 = 0;
	var out4 = 0;
	var fb = 0;
	var diff = 0;

	var pole = function pole(input, output) {
		return 0.3 * input + diff * output;
	};

	return function sampleGenerate(inputSample, f, resonance) {

		var fpower = Math.pow(f, 2);
		diff = 1 - f;

		fb = resonance * 4 * (1.0 - 0.15 * fpower);
		inputSample -= out4 * fb;
		inputSample *= 0.35013 * Math.pow(fpower, 2);

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