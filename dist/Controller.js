"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var parameters = {
	wave: {
		sine: 0.25,
		square: 0.5,
		saw: 1,
		saw2: 1,
		tech: 1,
		noise: 0,
		fm: 0.0,
		fmFreq: 0,
		offset: 0.9,
		voices: 1
	},
	envelope: {
		attack: 0,
		decay: 0.27,
		sustain: 0.15,
		release: 0.3
	},
	env: {
		filter: {
			attack: 0,
			decay: 0.21,
			sustain: 0.08,
			release: 0.1
		}
	},
	filter: {
		cutoff: 0.5,
		resonance: 0.15
	}
};
exports.default = parameters;