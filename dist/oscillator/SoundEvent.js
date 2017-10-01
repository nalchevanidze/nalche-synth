"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = SoundEvent;

var _Controller = require("../Controller");

var _Controller2 = _interopRequireDefault(_Controller);

var _WaveForm = require("./WaveForm");

var _WaveForm2 = _interopRequireDefault(_WaveForm);

var _EventTimes = require("./EventTimes");

var _EventTimes2 = _interopRequireDefault(_EventTimes);

var _WaveLooper = require("./WaveLooper");

var _WaveLooper2 = _interopRequireDefault(_WaveLooper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var wave = _Controller2.default.wave;
function SoundEvent() {
	var maxVoices = 12;
	var maxOffset = 2;
	var positions = Array.from({ length: maxVoices }, function () {
		return new _WaveLooper2.default();
	});

	var eventTimes = new _EventTimes2.default();
	var count = 0;
	function multyVoices() {
		var value = 0;
		for (var i = 0; i <= count; i++) {
			value += (0, _WaveForm2.default)(positions[i].next(), wave);
		}
		return value / (count + 1);
	}
	function reset(frequency) {

		count = wave.voices * (maxVoices - 1);
		var middle = Math.floor((count + 1) / 2);

		for (var i = 0; i <= count; i++) {
			var value = i - middle;
			var diff = value * wave.offset * maxOffset;
			positions[i].set(frequency + diff, wave.fm, wave.fmFreq);
		}
		eventTimes.restart();
	}

	var next = function next() {
		return eventTimes.next() * multyVoices();
	};

	return {
		eventTimes: eventTimes,
		next: next,
		reset: reset,
		end: eventTimes.end.bind(eventTimes)
	};
}