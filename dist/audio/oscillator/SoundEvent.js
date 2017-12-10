"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = SoundEvent;

var _WaveForm = require("./WaveForm");

var _WaveForm2 = _interopRequireDefault(_WaveForm);

var _Envelope = require("./Envelope");

var _Envelope2 = _interopRequireDefault(_Envelope);

var _WaveLooper = require("./WaveLooper");

var _WaveLooper2 = _interopRequireDefault(_WaveLooper);

var _MoogFilter = require("./MoogFilter");

var _MoogFilter2 = _interopRequireDefault(_MoogFilter);

var _NoteToFrequency = require("./NoteToFrequency");

var _NoteToFrequency2 = _interopRequireDefault(_NoteToFrequency);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Noise = function Noise() {
	return 1 - Math.random() * 2;
};
var Sine = function Sine(i) {
	return Math.sin(i * Math.PI * 2);
};

function SoundEvent(Controller) {
	var wave = Controller.wave;

	var maxVoices = 12;
	var maxOffset = 2;
	var filter = (0, _MoogFilter2.default)(Controller);

	var sinePosition = new _WaveLooper2.default();

	var positions = Array.from({ length: maxVoices }, function () {
		return new _WaveLooper2.default();
	});

	var envelope = new _Envelope2.default(Controller.envelope);
	var count = 0;

	function multyVoices() {

		var value = 0;
		var size = count;

		for (var i = 0; i <= count; i++) {

			value += (0, _WaveForm2.default)(positions[i].next(), wave);
		}

		if (wave.sine) {
			value += Sine(sinePosition.next()) * wave.sine;
			size++;
		}
		if (wave.noise > 0) {
			return (value + wave.noise * Noise()) / (size + 1 + wave.noise);
		}
		return value / (size + 1);
	}

	function reset(frequency) {

		count = wave.voices * (maxVoices - 1);
		var middle = Math.floor((count + 1) / 2);

		for (var i = 0; i <= count; i++) {
			var value = i - middle;
			var diff = value * wave.offset * maxOffset;
			positions[i].set(frequency + diff, wave.fm, wave.fmFreq);
		}
		sinePosition.set(frequency, wave.fm, wave.fmFreq);

		envelope.restart();

		filter.set();
	}

	var next = function next() {
		return filter.next(envelope.next() * multyVoices());
	};

	return {
		envelope: envelope,
		next: next,
		reset: reset,
		setNote: function setNote(note) {
			var range = Math.max(note + (Math.floor(wave.pitch * 8) - 4) * 12, 0);
			reset((0, _NoteToFrequency2.default)(range));
		},

		end: envelope.end.bind(envelope)
	};
}