"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = sequencer;

var _chordToKeys = require("./chordToKeys");

var _chordToKeys2 = _interopRequireDefault(_chordToKeys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sequence = [];
function sequencer(c, start, end) {
	start *= 32;
	end = start + end * 32;
	var i = start;
	var arpIndex = 0;
	var direction = 1;
	while (i <= end) {
		var note = 0;
		// makes saquence loop
		if (arpIndex >= sequence.length) {
			arpIndex = 0;
		}
		var currentChord = sequence[arpIndex];
		if (currentChord.length > 0) {
			var chord = currentChord.map(function (noteIndex) {
				noteIndex--;
				var outIndex = Math.floor(noteIndex / c.length);
				noteIndex = noteIndex % c.length;
				return c[noteIndex] + 12 * outIndex;
			});
			midi[i] = {
				start: chord,
				end: []
			};
			midi[i + 1] = {
				start: [],
				end: chord
			};
		}
		arpIndex++;
		i += 2;
	}
}