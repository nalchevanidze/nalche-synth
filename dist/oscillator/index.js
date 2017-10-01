"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = Oscillator;

var _Context = require("../Context");

var _Context2 = _interopRequireDefault(_Context);

var _FillAudioChenel = require("./FillAudioChenel");

var _FillAudioChenel2 = _interopRequireDefault(_FillAudioChenel);

var _NoteToFrequency = require("./NoteToFrequency");

var _NoteToFrequency2 = _interopRequireDefault(_NoteToFrequency);

var _SoundEvent = require("./SoundEvent");

var _SoundEvent2 = _interopRequireDefault(_SoundEvent);

var _MoogFilter = require("./MoogFilter");

var _MoogFilter2 = _interopRequireDefault(_MoogFilter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var destination = _Context2.default.destination;

var bufferSize = 2048; //4096;
function Oscillator() {

	var event = (0, _SoundEvent2.default)();
	var filter = (0, _MoogFilter2.default)();
	function onProcess(_ref) {
		var outputBuffer = _ref.outputBuffer;

		var audio = outputBuffer.getChannelData(0);
		if (event.eventTimes.live) {
			(0, _FillAudioChenel2.default)(audio, event);
		} else {
			audio.fill(0);
		}
	}
	var node = _Context2.default.createScriptProcessor(bufferSize, 1, 1);
	node.connect(filter);
	filter.connect(destination);
	node.onaudioprocess = onProcess;

	return {
		start: function start(param) {
			var frequency = (0, _NoteToFrequency2.default)(param.note);
			event.reset(frequency);
			filter.start();
		},
		end: function end() {
			event.end();
		},
		isActive: function isActive() {
			return event.eventTimes.live;
		}
	};
}