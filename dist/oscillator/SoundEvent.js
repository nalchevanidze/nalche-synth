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

    var position = new _WaveLooper2.default();
    var eventTimes = new _EventTimes2.default();
    var oldvalue = 0;

    function reset(frequency) {
        position.set(frequency, wave.fm, wave.fmFreq);
        eventTimes.restart();
    }

    function multyVoices(p) {
        var voices = 1 + Math.round(5 * wave.voices);
        var value = 0;
        var vocieOffset = 1 / voices;

        for (var i = 1; i <= voices; i++) {
            value += (0, _WaveForm2.default)(p * i * vocieOffset, wave);
        }

        return value / voices;
    }
    function next() {
        var p = position.next();
        return eventTimes.next() * multyVoices(p);
    }
    function end() {
        eventTimes.end();
    }

    return { position: position, eventTimes: eventTimes, next: next, reset: reset, end: end };
}