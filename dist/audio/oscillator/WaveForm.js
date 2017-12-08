"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = WaveForm;
var Square = function Square(i) {
	return Number(i > 0.5) * 2 - 1;
};
var Saw = function Saw(i) {
	return 1 - i * 2;
};
var Saw2 = function Saw2(i) {
	return 1 - i * 2 % 1 * 2;
};
var Tech = function Tech(i) {
	return i > 0.15 ? 0 : Math.min((0.05 - i % 0.05) * 50 - 0.7, 1);
};

function WaveForm(waveIndex, wave) {
	var square = wave.square,
	    saw = wave.saw,
	    saw2 = wave.saw2,
	    tech = wave.tech;

	var mixin = 0;
	var i = 0;

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

	if (tech) {
		mixin += Tech(waveIndex) * tech;
		i += tech;
	}
	if (i === 0) {
		return 0;
	}
	// mix
	return mixin / (i + 1);
}