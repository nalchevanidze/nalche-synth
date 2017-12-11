"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MoogSampler_1 = require("./MoogSampler");
var Context_1 = require("../../Context");
var sampleRate = Context_1.default.sampleRate;
var ATTACK = 0;
var DEACY = 1;
function filterBuilder(_a) {
    var env = _a.env, filter = _a.filter;
    var maxCutoff = 1.16;
    var f, resonance, type;
    var decayStep, attackStep, threshhold;
    var filterSample = MoogSampler_1.default();
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
        next: function (input) {
            if (!filter.on) {
                return input;
            }
            envelope();
            var frequency = filter.envelope === 0 ?
                filter.cutoff
                : Math.max(Math.pow((maxCutoff - (maxCutoff - f) * filter.envelope), 2), 0.02);
            return filterSample(input, frequency, resonance);
        },
        set: function () {
            var _a = env.filter, decay = _a.decay, sustain = _a.sustain, attack = _a.attack;
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
