"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = Oscillator;

var _Context = require("../Context");

var _Context2 = _interopRequireDefault(_Context);

var _FillAudioChenel = require("./FillAudioChenel");

var _FillAudioChenel2 = _interopRequireDefault(_FillAudioChenel);

var _timeLine = require("./timeLine");

var _timeLine2 = _interopRequireDefault(_timeLine);

var _oscManager = require("./oscManager");

var _oscManager2 = _interopRequireDefault(_oscManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var destination = _Context2.default.destination;

var bufferSize = 2048; //4096;
function Oscillator(Controller, target) {

	var notes = {};
	var active = new Set([]);
	//const noteList = new Map([]);

	var osc = (0, _oscManager2.default)(Controller);

	function simpleSet(value) {
		if (!notes[value]) {
			notes[value] = osc.getOsc();
			notes[value].setNote(value);
		}
	}

	function simpleUnset(value) {
		if (notes[value]) {
			notes[value].end();
			notes[value] = null;
		}
	}

	var event = {
		isPlayng: false,
		notes: notes,
		active: active,
		update: target,
		simpleSet: simpleSet,
		simpleUnset: simpleUnset
	};

	event.setNote = function (note) {
		if (event.isPlayng) {
			simpleSet(note);
		}
		active.add(note);
	};

	event.unsetNote = function (note) {
		if (event.isPlayng) {
			simpleUnset(note);
		}
		active.delete(note);
	};

	//main node;
	function onProcess(input) {
		var audio = input.outputBuffer.getChannelData(0);
		(0, _FillAudioChenel2.default)(audio, osc.active(), event);
	}

	var node = _Context2.default.createScriptProcessor(bufferSize, 1, 1);
	node.connect(destination);
	node.onaudioprocess = onProcess;

	function clear() {
		osc.clear();
		active.clear();
		Object.keys(notes).forEach(function (i) {
			notes[i] = null;
		});
	}

	event.pause = function () {
		clear();
		event.isPlayng = false;
	};

	event.setTime = function (time) {
		clear();
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