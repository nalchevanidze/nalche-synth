"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createMelodySet = require("./midi/createMelodySet");

var _createMelodySet2 = _interopRequireDefault(_createMelodySet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MidiPlayer = function () {
	function MidiPlayer(osc) {
		_classCallCheck(this, MidiPlayer);

		this.endIndex = 0;
		this.osc = osc;
		this.BPM = 128;
		this.next = this.next.bind(this);
		this.currentState = 0;
		this.seq = osc.sequence;
		this.melody = osc.midi;
		this.updateMidi = this.updateMidi.bind(this);
		this.updateMidi(this.melody);
		this.setTime = this.setTime.bind(this);
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
		key: "setTime",
		value: function setTime(value) {
			this.currentState = value;
			this.index = this.currentState;
			this.updateComponent();
		}
	}, {
		key: "updateMidi",
		value: function updateMidi(newMelody) {
			this.midiSet = (0, _createMelodySet2.default)(newMelody);
			this.endIndex = newMelody.length * 8;
			window.localStorage.midi = JSON.stringify(newMelody);
		}
	}, {
		key: "stop",
		value: function stop() {
			this.pause();
			this.currentState = 0;
		}
	}, {
		key: "pause",
		value: function pause() {
			clearInterval(this.loop);
			this.loop = undefined;
		}
	}, {
		key: "play",
		value: function play() {
			if (this.loop) return;
			this.index = this.currentState;
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
			this.currentState = this.index;
			if (this.updateComponent) {
				this.updateComponent(this.currentState);
			}
			this.state = this.midiSet[this.index];
			if (this.state) {
				this.executeState();
			}

			if (this.index >= this.endIndex) {
				this.index = 0;
			} else {
				this.index++;
			}
		}
	}]);

	return MidiPlayer;
}();

exports.default = MidiPlayer;