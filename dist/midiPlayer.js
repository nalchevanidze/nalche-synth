"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _keysToIndexes = require("./keysToIndexes");

var _keysToIndexes2 = _interopRequireDefault(_keysToIndexes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var midi = [];
var endIndex = 0;
var sequence = [];
function sequencer(c, start, end) {

	start *= 32;
	end = start + end * 32;
	endIndex = Math.max(end, endIndex);
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

function melody(melodyList) {

	melodyList.forEach(function (e, i) {
		sequencer((0, _keysToIndexes2.default)(e), i, 1);
	});
};

function addQuard(note, index) {

	var noteStart = midi[index * 16].start;
	noteStart.push(note);
	var noteEnd = midi[(index + 1) * 16 - 1].end;
	noteEnd.push(note);
}

var MidiPlayer = function () {
	function MidiPlayer(osc) {
		_classCallCheck(this, MidiPlayer);

		this.osc = osc;
		this.BPM = 60 * 1000 / (128 * 8);
		this.next = this.next.bind(this);
		this.seq = osc.sequence;
		sequence = osc.sequence;
		this.melody = osc.midi;
		this.updateMidi = this.updateMidi.bind(this);
		this.updateMidi();
	}

	_createClass(MidiPlayer, [{
		key: "updateMidi",
		value: function updateMidi(seq) {
			midi = [];
			melody(this.melody);
		}
	}, {
		key: "stop",
		value: function stop() {
			clearInterval(this.loop, this.BPM);
			this.loop = undefined;
		}
	}, {
		key: "play",
		value: function play() {
			if (this.loop) return;
			this.index = 0;
			this.loop = setInterval(this.next, this.BPM);
		}
	}, {
		key: "executeState",
		value: function executeState() {
			var _state = this.state,
			    end = _state.end,
			    start = _state.start;
			var osc = this.osc;

			end.forEach(osc.stop);
			start.forEach(osc.play);
		}
	}, {
		key: "next",
		value: function next() {
			this.state = midi[this.index];
			if (this.state) {
				this.executeState();
			}
			this.index++;
			if (this.index >= endIndex) {
				this.index = 0;
			};
		}
	}]);

	return MidiPlayer;
}();

exports.default = MidiPlayer;