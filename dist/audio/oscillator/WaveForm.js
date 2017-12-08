"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Square = (i) => Number(i > 0.5) * 2 - 1;
const Saw = (i) => 1 - i * 2;
const Saw2 = (i) => 1 - ((i * 2) % 1) * 2;
const Tech = (i) => (i > 0.15) ? 0 :
    Math.min((0.05 - i % 0.05) * 50 - 0.7, 1);
function WaveForm(waveIndex, wave) {
    let { square, saw, saw2, tech } = wave;
    let mixin = 0;
    let i = 0;
    if (square) {
        mixin += square * Square(waveIndex);
        i += square;
    }
    if (saw) {
        mixin += saw * Saw(waveIndex);
        i += saw;
    }
    if (saw2) {
        mixin += saw2 * Saw2(waveIndex);
        i += saw2;
    }
    if (tech) {
        mixin += Tech(waveIndex) * tech;
        i += tech;
    }
    if (i === 0) {
        return 0;
    }
    // mix
    return (mixin / (i + 1));
}
exports.default = WaveForm;
