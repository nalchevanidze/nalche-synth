"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Context = require("../Context");

var _Context2 = _interopRequireDefault(_Context);

var _createMelodySet = require("../midi/createMelodySet");

var _createMelodySet2 = _interopRequireDefault(_createMelodySet);

var _standartMidi = require("../../standartMidi");

var _standartMidi2 = _interopRequireDefault(_standartMidi);

var _sequencer = require("../sequencer");

var _sequencer2 = _interopRequireDefault(_sequencer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sampleRate = _Context2.default.sampleRate;

var bpm = 130;
var qartel = 1 / (60 * sampleRate / (bpm * 8));

var counter = 0;
var index = 0;

var midi = (0, _createMelodySet2.default)(_standartMidi2.default);
var endIndex = 128 || midi.length;

function PlayTask(task, main) {

	task.start.forEach(function (e) {
		main.setNote(e);
	});
	task.end.forEach(function (e) {
		main.unsetNote(e);
	});
}

function PlayMidi(main) {

	if (index >= endIndex) {
		index = 0;
	}

	if (midi[index]) {
		PlayTask(midi[index], main);
	}

	index++;

	var update = function update() {
		main.update(index, main.active);
	};
	requestAnimationFrame(update);
}

var sequencer = new _sequencer2.default();

function next(main) {
	counter += qartel;
	if (counter > 1) {
		if (!main.isPlayng) {
			sequencer.next(main);
		} else {
			PlayMidi(main);
		}
		counter = 0;
	}
}

exports.default = {
	sequencer: sequencer,
	next: next,
	setMidi: function setMidi(melody) {
		if (melody.length) {
			midi = (0, _createMelodySet2.default)(melody);
		}
	},
	setTime: function setTime(time) {
		index = time;
	}
};