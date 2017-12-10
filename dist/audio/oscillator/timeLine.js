"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Context_1 = require("../Context");
const createMelodySet_1 = require("../midi/createMelodySet");
const standartMidi_1 = require("../../standartMidi");
const sequencer_1 = require("../sequencer");
const { sampleRate } = Context_1.default;
let bpm = 130;
let qartel = 1 / (60 * sampleRate / (bpm * 8));
let counter = 0;
let index = 0;
let midi = createMelodySet_1.default(standartMidi_1.default);
let endIndex = 128 || midi.length;
function PlayTask(task, main) {
    task.start.forEach(e => main.setNote(e));
    task.end.forEach(e => main.unsetNote(e));
}
function PlayMidi(main) {
    if (index >= endIndex) {
        index = 0;
    }
    if (midi[index]) {
        PlayTask(midi[index], main);
    }
    index++;
    const update = () => {
        main.update(index, main.active);
    };
    requestAnimationFrame(update);
}
const sequencer = new sequencer_1.default();
exports.default = {
    sequencer,
    next(main) {
        counter += qartel;
        if (counter > 1) {
            if (!main.isPlayng) {
                if (main.seq.on) {
                    sequencer.next(main);
                }
            }
            else {
                PlayMidi(main);
                if (main.seq.on) {
                    sequencer.next(main);
                }
            }
            counter = 0;
        }
    },
    setMidi(melody) {
        if (melody.length) {
            midi = createMelodySet_1.default(melody);
        }
    },
    setTime(time) {
        index = time;
    }
};
