"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Context = require("../Context");

var _Context2 = _interopRequireDefault(_Context);

var _createMelodySet = require("../midi/createMelodySet");

var _createMelodySet2 = _interopRequireDefault(_createMelodySet);

var _standartMidi = require("../standartMidi");

var _standartMidi2 = _interopRequireDefault(_standartMidi);

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
		return main.setNote(e);
	});
	task.end.forEach(function (e) {
		return main.unsetNote(e);
	});
}

function next(main) {

	if (!main.isPlayng) {
		return null;
	}
	counter += qartel;
	if (counter > 1) {

		if (index >= endIndex) {
			index = 0;
		}

		if (midi[index]) {
			PlayTask(midi[index], main);
		}

		index++;
		counter = 0;
		var update = function update() {
			main.update(index, main.notes);
		};
		requestAnimationFrame(update);
	}
}

exports.default = {
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