"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
function FunctionalWave(func) {
	return "M" + Array.from({
		length: 40
	}, function (e, i) {
		return 30 + i + " " + (30 + func(i / 40) * 40);
	});
}
function rescale(vector) {
	return "M" + vector.map(function (value) {
		return 30 + value * 40;
	});
}
var lib = {
	saw: rescale([0, 0.5, 0, 0, 1, 1, 1, 0.5]),
	square: rescale([0, 0.5, 0, 0, 0.5, 0, 0.5, 1, 1, 1, 1, 0.5]),
	saw2: rescale([0, 0.5, 0, 0, 0.5, 1, 0.5, 0, 1, 1, 1, 0.5]),
	noise: FunctionalWave(Math.random),
	sine: FunctionalWave(function (e) {
		return Math.sin(e * 2 * Math.PI) / 2 + 0.5;
	}),
	tech: FunctionalWave(function (i) {
		var wave = 0.5;
		if (i < 0.15) {
			wave = Math.min((0.05 - i % 0.05) * 50 - 0.7, 1) - 0.5;
		}
		return wave;
	}),
	cutoff: "M25.03 34s11 .365 18.093-.415c7.092-.78 8.077-.095 12.153 5.524 4.075 5.618 19.06 29.97 19.06 29.97",
	resonance: "M25.86 65.488s17.086.177 24.168-30.246c6.56 30.48 25.135 29.14 25.135 29.14",
	fmFreq: "M22 49.8h6.5v20C39 71.3 37.5 30 44.3 30 51 30 50 70 56.7 70c6.7 0 2.6-39.7 6.5-40C67 30 63.8 70 70 70V50h8"
};

lib.offset = "M30 50 l0 10 m10-20 l0 20 m10-30 l0 30 m10-20 l0 20 m10-10 l0 10";

lib.fm = lib.sine;

exports.default = lib;