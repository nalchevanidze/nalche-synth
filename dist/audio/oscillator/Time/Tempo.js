"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Context_1 = require("../../Context");
const { sampleRate } = Context_1.default;
let counter = 0;
let subStep = 0;
class Tempo {
    set BMP(beatsPerMinute) {
        this.BMP = beatsPerMinute;
        subStep = 1 / (60 * sampleRate / (beatsPerMinute * 8));
    }
    constructor() {
        this.BPM = 130;
        subStep = 1 / (60 * sampleRate / (this.BPM * 8));
    }
    next() {
        counter += subStep;
        if (counter > 1) {
            counter = 0;
            return true;
        }
        return false;
    }
}
exports.default = Tempo;
