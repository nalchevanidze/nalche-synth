"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Context_1 = require("../Context");
const FillAudioChenel_1 = require("./FillAudioChenel");
const { destination } = Context_1.default;
const bufferSize = 2048;
const timeLine_1 = require("./timeLine");
const oscManager_1 = require("./oscManager");
function Oscillator(Controller, target) {
    const notes = {};
    const active = new Set([]);
    const osc = oscManager_1.default(Controller);
    function simpleSet(note) {
        if (!notes[note]) {
            notes[note] = osc.getOsc(note);
        }
    }
    function simpleUnset(value) {
        if (notes[value]) {
            notes[value].end();
            notes[value] = null;
        }
    }
    const event = {
        isPlayng: false,
        notes,
        active,
        seq: Controller.seq,
        update: target,
        simpleSet,
        simpleUnset,
        setSequence: timeLine_1.default.sequencer.setSequence,
    };
    event.setNote = note => {
        if (!active.has(note)) {
            timeLine_1.default.sequencer.restart();
        }
        active.add(note);
        if (!event.seq.on) {
            simpleSet(note);
        }
        target(0, active);
    };
    event.unsetNote = note => {
        active.delete(note);
        if (!event.seq.on) {
            simpleUnset(note);
        }
        target(0, active);
    };
    const node = Context_1.default.createScriptProcessor(bufferSize, 1, 1);
    node.connect(destination);
    node.onaudioprocess = function onProcess(input) {
        FillAudioChenel_1.default(input.outputBuffer.getChannelData(0), osc.active(), event);
    };
    function clear() {
        osc.clear();
        active.clear();
        Object.keys(notes).forEach(i => {
            notes[i] = null;
        });
    }
    event.pause = () => {
        clear();
        event.isPlayng = false;
    };
    event.setTime = (time) => {
        clear();
        timeLine_1.default.setTime(time);
        target(time);
    };
    event.stop = () => {
        event.pause();
        timeLine_1.default.setTime(0);
    };
    event.setMidi = timeLine_1.default.setMidi;
    event.play = () => {
        event.isPlayng = true;
    };
    return event;
}
exports.default = Oscillator;
