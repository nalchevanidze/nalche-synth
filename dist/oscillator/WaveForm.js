"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = WaveForm;
function WaveForm(WaveIndex, wave) {
	var sine = wave.sine,
	    square = wave.square,
	    saw = wave.saw,
	    saw2 = wave.saw2,
	    noise = wave.noise,
	    tech = wave.tech;


	var mixin = 0;
	var i = 0;

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
		mixin += saw2 * (1 - WaveIndex * 2 % 1 * 2);
		i += saw2;
	}
	if (noise) {
		mixin += noise * (1 - Math.random() * 2);
		i += noise;
	}

	if (tech) {
		var _wave = 0;
		if (WaveIndex < 0.15) {
			_wave = Math.min((0.05 - WaveIndex % 0.05) * 50 - 0.7, 1);
		}
		mixin += _wave * tech;
		i += tech;
	}

	if (i === 0) {
		return 0;
	}
	// mix
	return mixin / i;
}