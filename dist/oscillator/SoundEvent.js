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

var _filterBuilder = require("./filterBuilder");

var _filterBuilder2 = _interopRequireDefault(_filterBuilder);

var _NoteToFrequency = require("./NoteToFrequency");

var _NoteToFrequency2 = _interopRequireDefault(_NoteToFrequency);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var wave = _Controller2.default.wave;

// function test() {
// 	let i = 10000000;

// 	let t0 = performance.now();
// 	while (i) {
// 		i--;
// 		WaveForm(Math.random(), wave);
// 	}
// 	let t1 = performance.now();

// 	//console.log("took " + (t1 - t0) + " milliseconds.");
// }


function SoundEvent() {
	var maxVoices = 12;
	var maxOffset = 2;
	var filter = (0, _filterBuilder2.default)();
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

		filter.set();
	}

	var next = function next() {
		return filter.next(eventTimes.next() * multyVoices());
	};

	return {
		eventTimes: eventTimes,
		next: next,
		reset: reset,
		setNote: function setNote(note) {
			var range = Math.max(note + (Math.floor(wave.pitch * 8) - 4) * 12, 0);
			reset((0, _NoteToFrequency2.default)(range));
		},

		end: eventTimes.end.bind(eventTimes)
	};
}