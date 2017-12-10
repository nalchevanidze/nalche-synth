"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parameters = {
    wave: {
        sine: 0,
        square: 0.5,
        saw: 1,
        saw2: 1,
        tech: 1,
        noise: 0.5,
        fm: 0.25,
        fmFreq: 0,
        offset: 0.625,
        voices: 1,
        pitch: 0.625
    },
    seq: {
        on: false
    },
    envelope: {
        attack: 0,
        decay: 0.27,
        sustain: 0.5,
        release: 0.3
    },
    env: {
        filter: {
            attack: 0,
            decay: 0.21,
            sustain: 0.08,
            release: 0.1
        },
    },
    filter: {
        cutoff: 1,
        resonance: 0.25,
        envelope: 0
    }
};
exports.default = parameters;
