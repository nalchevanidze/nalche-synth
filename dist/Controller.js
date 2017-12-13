"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parameters = {
    wave: {
        sine: 1,
        square: 0,
        saw: 1,
        saw2: 0.5,
        tech: 0.4,
        noise: 0,
        fm: 0.25,
        fmFreq: 0,
        offset: 0.3,
        voices: 0.5,
        pitch: 0.625
    },
    seq: {
        on: true
    },
    env: {
        filter: {
            attack: 0,
            decay: 0.4,
            sustain: 0.08,
            release: 0.1
        },
        gain: {
            attack: 0.,
            decay: 0.4,
            sustain: 0.5,
            release: 0.3
        }
    },
    filter: {
        cutoff: 0.4,
        resonance: 0.2,
        envelope: 0.6,
        on: true
    }
};
exports.default = parameters;
