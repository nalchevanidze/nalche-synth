"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MoogSampler_1 = require("./MoogSampler");
const Context_1 = require("../../Context");
const { sampleRate } = Context_1.default;
const ATTACK = 0;
const DEACY = 1;
function filterBuilder({ env, filter }) {
    let maxCutoff = 1.16;
    let f, resonance, type;
    let decayStep, attackStep, threshhold;
    let filterSample = MoogSampler_1.default();
    function envelope() {
        if (type === ATTACK) {
            f += attackStep;
            if (f >= maxCutoff) {
                type = DEACY;
                f = maxCutoff;
            }
        }
        else if (f > threshhold) {
            f -= decayStep;
        }
    }
    return {
        next(input) {
            if (!filter.on) {
                return input;
            }
            envelope();
            let frequency = filter.envelope === 0 ?
                filter.cutoff
                : Math.max(Math.pow((maxCutoff - (maxCutoff - f) * filter.envelope), 2), 0.02);
            return filterSample(input, frequency, resonance);
        },
        set() {
            let { decay, sustain, attack } = env.filter;
            f = 0.1;
            maxCutoff = filter.cutoff * 1.16;
            resonance = filter.resonance;
            type = ATTACK;
            decayStep = Math.min(1, 1 / (sampleRate * decay));
            attackStep = Math.min(1, 1 / (sampleRate * attack));
            threshhold = Math.max(sustain * maxCutoff, 0.001);
        }
    };
}
exports.default = filterBuilder;
