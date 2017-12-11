"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createMelodySet_1 = require("../../midi/createMelodySet");
const standartMidi_1 = require("../../../standartMidi");
let index = 0;
let midi = createMelodySet_1.default(standartMidi_1.default);
let endIndex = 128 || midi.length;
class TaskQueue {
    constructor(main) {
        this.runTask = ({ end, start }) => {
            start.forEach(this.setNote);
            end.forEach(this.unsetNote);
        };
        this.nextTask = () => {
            if (index >= endIndex) {
                index = 0;
            }
            if (midi[index]) {
                this.runTask(midi[index]);
            }
            index++;
            requestAnimationFrame(this.update);
        };
        this.main = main;
        this.setNote = note => main.setNote(note);
        this.unsetNote = note => main.unsetNote(note);
        this.update = () => main.update(index, main.active);
    }
    setMidi(melody) {
        if (melody.length) {
            midi = createMelodySet_1.default(melody);
        }
        endIndex = midi.length;
    }
    setTime(time) {
        index = time;
    }
}
exports.default = TaskQueue;
