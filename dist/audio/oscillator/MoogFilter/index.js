"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MoogSampler_1 = require("./MoogSampler");
var Context_1 = require("../../Context");
var sampleRate = Context_1.default.sampleRate;
var envelopeTypes_1 = require("../Envelope/envelopeTypes");
function filterBuilder(_a) {
    var env = _a.env, filter = _a.filter;
    var maxCutoff = 1.16;
    var cutoff, resonance, type;
    var decayStep, attackStep, sustainLevel;
    var filterSample = MoogSampler_1.default();
    function envelope() {
        switch (type) {
            case envelopeTypes_1.envelopeStates.ATTACK: {
                cutoff += attackStep;
                if (cutoff >= maxCutoff) {
                    type = envelopeTypes_1.envelopeStates.DEACY;
                    cutoff = maxCutoff;
                }
                break;
            }
            case envelopeTypes_1.envelopeStates.DEACY: {
                if (cutoff > sustainLevel) {
                    cutoff -= decayStep;
                }
                else {
                    cutoff = sustainLevel;
                    type = envelopeTypes_1.envelopeStates.SUSTAIN;
                }
                break;
            }
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
                : Math.max(Math.pow((maxCutoff - (maxCutoff - cutoff) * filter.envelope), 2), 0.02);
            return filterSample(input, frequency, resonance);
        },
        set: function () {
            var _a = env.filter, decay = _a.decay, sustain = _a.sustain, attack = _a.attack;
            cutoff = 0.1;
            maxCutoff = filter.cutoff * 1.16;
            resonance = filter.resonance;
            type = envelopeTypes_1.envelopeStates.ATTACK;
            decayStep = Math.min(1, 1 / (sampleRate * decay));
            attackStep = Math.min(1, 1 / (sampleRate * attack));
            sustainLevel = Math.max(sustain * maxCutoff, 0.001);
        }
    };
}
exports.default = filterBuilder;
