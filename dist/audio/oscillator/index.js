"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Context_1 = require("../Context");
var FillAudioChenel_1 = require("./FillAudioChenel");
var destination = Context_1.default.destination;
var bufferSize = 2048;
var Time_1 = require("./Time");
var oscManager_1 = require("./oscManager");
var Oscillator = (function () {
    function Oscillator(controller, target) {
        var _this = this;
        this.isPlayng = false;
        this.simpleSet = function (note) {
            if (_this.notes[note]) {
                _this.simpleUnset(note);
            }
            _this.notes[note] = _this.osc.getOsc(note);
        };
        this.simpleUnset = function (value) {
            if (_this.notes[value]) {
                _this.notes[value].end();
                delete _this.notes[value];
            }
        };
        this.unsetNote = function (note) {
            _this.active.delete(note);
            if (!_this.seq.on) {
                _this.simpleUnset(note);
            }
            _this.update(0, _this.active);
        };
        this.setNote = function (note) {
            var active = _this.active;
            if (!active.has(note)) {
                _this.timeLine.sequencer.restart();
            }
            active.add(note);
            if (!_this.seq.on) {
                _this.simpleSet(note);
            }
            _this.update(0, active);
        };
        this.clear = function () {
            _this.osc.clear();
            _this.active.clear();
            _this.notes = {};
        };
        this.pause = function () {
            _this.clear();
            _this.isPlayng = false;
        };
        this.setTime = function (time) {
            _this.clear();
            _this.timeLine.setTime(time);
            _this.update(time, _this.active);
        };
        this.stop = function () {
            _this.pause();
            _this.timeLine.setTime(0);
        };
        this.play = function () {
            _this.isPlayng = true;
        };
        this.notes = {};
        this.active = new Set([]);
        this.osc = oscManager_1.default(controller);
        this.seq = controller.seq;
        this.update = target;
        this.timeLine = new Time_1.default(this);
        this.setSequence = this.timeLine.sequencer.setSequence;
        this.setSequence(controller.sequence);
        this.setMidi = this.timeLine.setMidi;
        var node = Context_1.default.createScriptProcessor(bufferSize, 1, 1);
        node.connect(destination);
        node.onaudioprocess = function (input) {
            FillAudioChenel_1.default(input.outputBuffer.getChannelData(0), _this.osc.active(), _this.timeLine);
        };
    }
    Oscillator.prototype.setSetting = function (oscSetting) {
        this.osc = oscManager_1.default(oscSetting);
        this.seq = oscSetting.seq;
        this.setSequence(oscSetting.sequence);
    };
    return Oscillator;
}());
exports.default = Oscillator;
