"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var parameters = {

	wave: {
		sine: 0,
		square: 1,
		saw: 0,
		saw2: 1,
		tech: 0.5,
		noise: 0,
		fm: 0.5,
		fmFreq: 0
	},

	envelope: {
		release: 0.3,
		attack: 0,
		sustain: 0.3,
		decay: 0.3
	},

	filter: {
		cutoff: 0.2,
		resonance: 0.5
	}

};
exports.default = parameters;