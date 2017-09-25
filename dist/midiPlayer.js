"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chordToKeys = require("./chordToKeys");

var _chordToKeys2 = _interopRequireDefault(_chordToKeys);

var _keysToIndexes = require("./keysToIndexes");

var _keysToIndexes2 = _interopRequireDefault(_keysToIndexes);

var _standartMidi = require("./standartMidi");

var _standartMidi2 = _interopRequireDefault(_standartMidi);

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

function setValue(i, type, value) {

	if (!midi[i]) {
		midi[i] = {
			start: [],
			end: []
		};
	};
	midi[i][type].push((0, _keysToIndexes2.default)(value));

	endIndex = Math.max(i, endIndex);
}

function setNote(startIndex, note) {
	var start = startIndex + note.at;
	var end = start + note.length;
	setValue(start, "start", note.id);
	setValue(end, "end", note.id);
}

function melody(melodyList) {
	_standartMidi2.default.forEach(function (e, i) {
		if (e) {
			e.forEach(function (note) {
				setNote(i * 8, note);
			});
		}
	});
};

var MidiPlayer = function () {
	function MidiPlayer(osc) {
		_classCallCheck(this, MidiPlayer);

		this.osc = osc;
		this.BPM = 100;
		this.next = this.next.bind(this);
		this.currentState = 0;
		this.seq = osc.sequence;
		sequence = osc.sequence;
		this.melody = osc.midi;
		this.updateMidi = this.updateMidi.bind(this);
		this.updateMidi();
		this.updateComponent = osc.component;
		this.setBPM = this.setBPM.bind(this);
	}

	_createClass(MidiPlayer, [{
		key: "setBPM",
		value: function setBPM(value) {
			this.BPM = value;
			this.updateComponent(this.currentState);
			clearInterval(this.loop);
		}
	}, {
		key: "updateMidi",
		value: function updateMidi(seq) {
			midi = [];
			melody(_standartMidi2.default);
			//melody(this.melody)
		}
	}, {
		key: "stop",
		value: function stop() {
			clearInterval(this.loop);
			this.loop = undefined;
			this.currentState = 0;
		}
	}, {
		key: "play",
		value: function play() {
			if (this.loop) return;
			this.index = 0;
			this.loop = setInterval(this.next, 60 * 1000 / (this.BPM * 8));
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
			this.currentState = this.index / endIndex;
			if (this.updateComponent) {
				this.updateComponent(this.currentState);
			}
			this.state = midi[this.index];
			if (this.state) {
				this.executeState();
			}

			if (this.index >= endIndex) {
				this.index = 0;
			} else {
				this.index++;
			}
		}
	}]);

	return MidiPlayer;
}();

exports.default = MidiPlayer;