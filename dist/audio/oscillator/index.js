"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = Oscillator;

var _Context = require("../Context");

var _Context2 = _interopRequireDefault(_Context);

var _FillAudioChenel = require("./FillAudioChenel");

var _FillAudioChenel2 = _interopRequireDefault(_FillAudioChenel);

var _SoundEvent = require("./SoundEvent");

var _SoundEvent2 = _interopRequireDefault(_SoundEvent);

var _timeLine = require("./timeLine");

var _timeLine2 = _interopRequireDefault(_timeLine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var destination = _Context2.default.destination;

var bufferSize = 2048; //4096;
function Oscillator(target) {

	var notes = {};
	var oscList = Array.from({ length: 6 }, function () {
		return (0, _SoundEvent2.default)();
	});
	var event = {
		dead: true,
		notes: notes,
		update: target,
		unsetNote: function unsetNote(value) {
			if (notes[value]) {
				notes[value].end();
				notes[value] = null;
			}
		},
		setNote: function setNote(value) {
			if (!notes[value]) {
				var current = oscList.filter(function (osc) {
					return !osc.eventTimes.live;
				})[0];
				if (!current) {
					current = (0, _SoundEvent2.default)();
					oscList.push(current);
				}
				notes[value] = current;
				current.setNote(value);
			}
		},
		start: function start(param) {
			oscList.forEach(function (e) {
				e.setNote(param.note);
			});
		}
	};

	//main node;
	function onProcess(input) {
		var active = oscList.filter(function (e) {
			return e.eventTimes.live;
		});
		var audio = input.outputBuffer.getChannelData(0);
		(0, _FillAudioChenel2.default)(audio, active, event);
	}

	var node = _Context2.default.createScriptProcessor(bufferSize, 1, 1);
	node.connect(destination);
	node.onaudioprocess = onProcess;

	function clean() {
		oscList.forEach(function (e) {
			return e.end();
		});
		Object.keys(notes).forEach(function (i) {
			notes[i] = null;
		});
	}

	event.pause = function () {
		clean();
		event.isPlayng = false;
	};

	event.setTime = function (time) {
		clean();
		_timeLine2.default.setTime(time);
		target(time);
	};

	//Main Functions
	event.stop = function () {
		event.pause();
		_timeLine2.default.setTime(0);
	};

	event.setMidi = _timeLine2.default.setMidi;
	//event.setTime = timeLine.setTime;

	event.play = function () {
		event.isPlayng = true;
	};

	return event;
}