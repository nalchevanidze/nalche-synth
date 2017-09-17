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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sampleRate = _Context2.default.sampleRate,
    destination = _Context2.default.destination;
function Oscillator() {

    var node = _Context2.default.createScriptProcessor(1024, 1, 1);
    var event = (0, _SoundEvent2.default)();

    node.onaudioprocess = function (_ref) {
        var outputBuffer = _ref.outputBuffer;


        var audio = outputBuffer.getChannelData(0);
        if (event.eventTimes.live) {
            (0, _FillAudioChenel2.default)(audio, event);
        } else {
            audio.fill(0);
        }
    };

    node.start = function (param) {

        var frequency = (0, _NoteToFrequency2.default)(param.note);
        event.reset(frequency);
    };

    node.end = function () {

        event.end();
    };

    node.isActive = function (e) {
        return event.eventTimes.live;
    };

    node.connect(destination);

    return node;
}