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
    var positions = [];
    var position = new _WaveLooper2.default();
    var position2 = new _WaveLooper2.default();
    var position3 = new _WaveLooper2.default();
    var position4 = new _WaveLooper2.default();
    var position5 = new _WaveLooper2.default();
    var eventTimes = new _EventTimes2.default();
    var oldvalue = 0;
    function reset(frequency) {
        position.set(frequency, wave.fm, wave.fmFreq);
        position2.set(frequency - 1 * wave.offset, wave.fm, wave.fmFreq);
        position3.set(frequency + 1 * wave.offset, wave.fm, wave.fmFreq);
        position4.set(frequency - 2 * wave.offset, wave.fm, wave.fmFreq);
        position5.set(frequency + 2 * wave.offset, wave.fm, wave.fmFreq);
        eventTimes.restart();
    }

    function multyVoices(p) {
        if (wave.voices > 0.75) {
            return ((0, _WaveForm2.default)(position.next(), wave) + (0, _WaveForm2.default)(position2.next(), wave) + (0, _WaveForm2.default)(position3.next(), wave) + (0, _WaveForm2.default)(position4.next(), wave) + (0, _WaveForm2.default)(position5.next(), wave)) / 5;
        }
        if (wave.voices > 0.5) {
            return ((0, _WaveForm2.default)(position.next(), wave) + (0, _WaveForm2.default)(position2.next(), wave) + (0, _WaveForm2.default)(position3.next(), wave)) / 3;
        }
        if (wave.voices > 0.25) {
            return ((0, _WaveForm2.default)(position.next(), wave) + (0, _WaveForm2.default)(position2.next(), wave)) / 2;
        }
        return (0, _WaveForm2.default)(position.next(), wave);
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