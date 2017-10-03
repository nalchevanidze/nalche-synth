"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = WaveForm;
var Sine = function Sine(i) {
	return Math.sin(i * Math.PI * 2);
};
var Square = function Square(i) {
	return Number(i > 0.5) * 2 - 1;
};
var Saw = function Saw(i) {
	return 1 - i * 2;
};
var Saw2 = function Saw2(i) {
	return 1 - i * 2 % 1 * 2;
};
var Noise = function Noise() {
	return 1 - Math.random() * 2;
};
var Tech = function Tech(i) {

	if (i > 0.15) {
		return 0;
	}
	return Math.min((0.05 - i % 0.05) * 50 - 0.7, 1);
};

function WaveForm(waveIndex, wave) {
	var sine = wave.sine,
	    square = wave.square,
	    saw = wave.saw,
	    saw2 = wave.saw2,
	    noise = wave.noise,
	    tech = wave.tech;

	var mixin = 0;
	var i = 0;

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
	return mixin / (i + 1);
}