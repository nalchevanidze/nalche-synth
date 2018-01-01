"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var countdownIterator_1 = require("./countdownIterator");
var envelopeTypes_1 = require("./envelopeTypes");
var Envelope = (function () {
    function Envelope(env) {
        this.env = env;
        this.live = false;
        this.volume = 0;
        this.restart = this.restart.bind(this);
        this.next = this.next.bind(this);
        this.end = this.end.bind(this);
        this.updateStep = this.updateStep.bind(this);
        this.state = envelopeTypes_1.envelopeStates.ATTACK;
    }
    Envelope.prototype.updateStep = function (_a) {
        var done = _a.done, value = _a.value;
        this.volume = value;
        if (done) {
            if (this.state == envelopeTypes_1.envelopeStates.ATTACK) {
                this.getValue = countdownIterator_1.default(this.env.decay, this.volume, this.env.sustain);
            }
            this.state++;
        }
        return this.volume;
    };
    Envelope.prototype.next = function () {
        if (!this.live) {
            return 0;
        }
        switch (this.state) {
            case envelopeTypes_1.envelopeStates.ATTACK:
            case envelopeTypes_1.envelopeStates.DEACY:
                this.updateStep(this.getValue.next());
            case envelopeTypes_1.envelopeStates.SUSTAIN:
                return this.volume;
            default:
                var release = this.getValue.next();
                this.live = !release.done;
                return release.value;
        }
    };
    Envelope.prototype.restart = function () {
        this.live = true;
        this.state = envelopeTypes_1.envelopeStates.ATTACK;
        this.volume = 1;
        this.getValue = countdownIterator_1.default(this.env.attack, 0, 1);
    };
    Envelope.prototype.end = function () {
        this.getValue = countdownIterator_1.default(this.env.release, this.volume, 0);
        this.state = envelopeTypes_1.envelopeStates.RELEASE;
    };
    return Envelope;
}());
exports.default = Envelope;
