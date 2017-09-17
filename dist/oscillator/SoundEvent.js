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

function SoundEvent() {
    var position = new _WaveLooper2.default();
    var eventTimes = new _EventTimes2.default();
    function reset(frequency) {
        position.set(frequency, _Controller2.default.wave.fm);
        eventTimes.restart();
    }
    function next() {
        return eventTimes.next() * (0, _WaveForm2.default)(position.next(), _Controller2.default.wave);
    }
    function end() {
        eventTimes.end();
    }

    return { position: position, eventTimes: eventTimes, next: next, reset: reset, end: end };
}