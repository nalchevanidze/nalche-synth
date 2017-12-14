"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Context_1 = require("../Context");
const FillAudioChenel_1 = require("./FillAudioChenel");
const { destination } = Context_1.default;
const bufferSize = 2048;
const Time_1 = require("./Time");
const oscManager_1 = require("./oscManager");
class Oscillator {
    constructor(controller, target, sequence) {
        this.isPlayng = false;
        this.simpleSet = (note) => {
            if (this.notes[note]) {
                this.simpleUnset(note);
            }
            this.notes[note] = this.osc.getOsc(note);
        };
        this.simpleUnset = (value) => {
            if (this.notes[value]) {
                this.notes[value].end();
                delete this.notes[value];
            }
        };
        this.unsetNote = (note) => {
            this.active.delete(note);
            if (!this.seq.on) {
                this.simpleUnset(note);
            }
            this.update(0, this.active);
        };
        this.setNote = (note) => {
            let { active } = this;
            if (!active.has(note)) {
                this.timeLine.sequencer.restart();
            }
            active.add(note);
            if (!this.seq.on) {
                this.simpleSet(note);
            }
            this.update(0, active);
        };
        this.clear = () => {
            this.osc.clear();
            this.active.clear();
            this.notes = {};
        };
        this.pause = () => {
            this.clear();
            this.isPlayng = false;
        };
        this.setTime = (time) => {
            this.clear();
            this.timeLine.setTime(time);
            this.update(time, this.active);
        };
        this.stop = () => {
            this.pause();
            this.timeLine.setTime(0);
        };
        this.play = () => {
            this.isPlayng = true;
        };
        this.notes = {};
        this.active = new Set([]);
        this.osc = oscManager_1.default(controller);
        this.seq = controller.seq;
        this.update = target;
        this.timeLine = new Time_1.default(this);
        this.setSequence = this.timeLine.sequencer.setSequence;
        this.setSequence(sequence);
        this.setMidi = this.timeLine.setMidi;
        const node = Context_1.default.createScriptProcessor(bufferSize, 1, 1);
        node.connect(destination);
        node.onaudioprocess = (input) => {
            FillAudioChenel_1.default(input.outputBuffer.getChannelData(0), this.osc.active(), this.timeLine);
        };
    }
}
exports.default = Oscillator;
