"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultPreset = {
    wave: {
        sine: 0.2,
        square: 1,
        saw: 1,
        saw2: 1,
        tech: 0,
        noise: 0,
        fm: 0,
        fmFreq: 0,
        offset: 0.75,
        voices: 1,
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
            attack: 0,
            decay: 0.05,
            sustain: 0.5,
            release: 0.3
        }
    },
    filter: {
        cutoff: 0.35,
        resonance: 0.2,
        envelope: 0.6,
        on: false
    }
};
const pluck = {
    wave: {
        sine: 1,
        square: 0,
        saw: 0,
        saw2: 0.125,
        tech: 0,
        noise: 0,
        fm: 0,
        fmFreq: 0,
        offset: 0,
        voices: 0,
        pitch: 0.5
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
            attack: 0,
            decay: 0.2,
            sustain: 0.3,
            release: 0.3
        }
    },
    filter: {
        cutoff: 0.5,
        resonance: 0.2,
        envelope: 0.6,
        on: true
    }
};
const presets = {
    default: defaultPreset,
    pluck: pluck,
};
exports.default = presets;
