"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = sequnecing;
var sequence = [[1, 2, 3], [], [], [1, 2, 3], [], [], [1, 2, 3], [], [1, 2, 3], [], [1], [2], [3], [2], [], []];

function sequencer() {
	var arpIndex = 0;
	var endIndex = sequence.length;
	return {
		next: function next(notes) {
			var chord = [];
			var maxNotes = notes.size;

			var values = Array.from(notes).sort(function (a, b) {
				return a > b ? 1 : -1;
			});

			if (maxNotes) {
				chord = sequence[arpIndex].map(function (i) {
					i--;
					var octave = 12 * Math.floor(i / maxNotes);
					var selectIndex = i % maxNotes;
					return values[selectIndex] + octave;
				});
			}
			arpIndex++;
			if (arpIndex >= endIndex) {
				arpIndex = 0;
			}
			return chord;
		}
	};
}

var oldChord = [];
var seq = sequencer();
var steps = 2;
var state = 0;
function sequnecing(main) {
	sequence = main.seq || sequence;
	state++;
	if (state >= steps) {
		var chord = seq.next(main.active);
		oldChord.forEach(function (v) {
			return main.simpleUnset(v);
		});
		chord.forEach(function (v) {
			return main.simpleSet(v);
		});
		oldChord = chord;
		state = 0;
	}
}