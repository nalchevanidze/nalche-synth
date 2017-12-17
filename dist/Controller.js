"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var defaultPreset = {
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
        voices: 12,
        octave: 1
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
var pluck = {
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
        voices: 1,
        octave: 0
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
        cutoff: 0.4,
        resonance: 0.2,
        envelope: 0.6,
        on: true
    }
};
var Razor = {
    wave: {
        sine: 1,
        square: 0,
        saw: 0,
        saw2: 0.125,
        tech: 1,
        noise: 0,
        fm: 0.7,
        fmFreq: 0.53125,
        offset: 0,
        voices: 3,
        octave: 0
    },
    seq: {
        on: false
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
            sustain: 1,
            release: 0.3
        }
    },
    filter: {
        cutoff: 0.5,
        resonance: 0.2,
        envelope: 0.6,
        on: false
    }
};
var Padd = {
    wave: {
        sine: 1,
        square: 0.1,
        saw: 0.4,
        saw2: 0.125,
        tech: 0,
        noise: 0,
        fm: 0,
        fmFreq: 0,
        offset: 0.5,
        voices: 1,
        octave: 0
    },
    seq: {
        on: false
    },
    env: {
        filter: {
            attack: 0.7,
            decay: 0.7,
            sustain: 0.08,
            release: 0.1
        },
        gain: {
            attack: 0.2,
            decay: 0.2,
            sustain: 1,
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
var presets = {
    default: defaultPreset,
    pluck: pluck,
    razor: Razor,
    padd: Padd
};
exports.default = presets;
