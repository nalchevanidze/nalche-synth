"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createMelodySet_1 = require("../../midi/createMelodySet");
var standartMidi_1 = require("../../../standartMidi");
var index = 0;
var midi = createMelodySet_1.default(standartMidi_1.default);
var endIndex = 128 || midi.length;
var TaskQueue = (function () {
    function TaskQueue(main) {
        var _this = this;
        this.runTask = function (_a) {
            var end = _a.end, start = _a.start;
            start.forEach(_this.setNote);
            end.forEach(_this.unsetNote);
        };
        this.nextTask = function () {
            if (index >= endIndex) {
                index = 0;
            }
            if (midi[index]) {
                _this.runTask(midi[index]);
            }
            index++;
            requestAnimationFrame(_this.update);
        };
        this.main = main;
        this.setNote = function (note) { return main.setNote(note); };
        this.unsetNote = function (note) { return main.unsetNote(note); };
        this.update = function () { return main.update(index, main.active); };
    }
    TaskQueue.prototype.setMidi = function (melody) {
        if (melody.length) {
            midi = createMelodySet_1.default(melody);
        }
        endIndex = midi.length;
    };
    TaskQueue.prototype.setTime = function (time) {
        index = time;
    };
    return TaskQueue;
}());
exports.default = TaskQueue;
