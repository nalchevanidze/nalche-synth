"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var sequence = [[1, 2, 3], [], [], [1, 2, 3], [], [], [1, 2, 3], [], [1, 2, 3], [], [1], [2], [3], [2], [], []];
var arpIndex = 0;

function sequencer() {
	arpIndex = 0;
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

var Sequencer = function () {
	function Sequencer() {
		_classCallCheck(this, Sequencer);

		this.state = 0;
		this.setSequence = this.setSequence.bind(this);
		this.restart = this.restart.bind(this);
	}

	_createClass(Sequencer, [{
		key: "next",
		value: function next(main) {
			if (this.state >= steps) {

				var chord = seq.next(main.active);

				oldChord.forEach(function (v) {
					return main.simpleUnset(v);
				});

				chord.forEach(function (v) {
					return main.simpleSet(v);
				});

				oldChord = chord;
				this.state = 0;
			}
			this.state++;
		}
	}, {
		key: "setSequence",
		value: function setSequence(seq) {
			this.sequence = seq;
			sequence = seq;
		}
	}, {
		key: "restart",
		value: function restart() {
			arpIndex = 0;
		}
	}]);

	return Sequencer;
}();

exports.default = Sequencer;