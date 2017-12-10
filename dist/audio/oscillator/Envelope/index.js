"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const countdownIterator_1 = require("./countdownIterator");
const ATTACK = 0;
const DEACY = 1;
const SUSTAIN = 2;
const RELEASE = 3;
class Envelope {
    constructor(env) {
        this.env = env;
        this.live = false;
        this.volume = 0;
        this.restart = this.restart.bind(this);
        this.next = this.next.bind(this);
        this.end = this.end.bind(this);
        this.updateStep = this.updateStep.bind(this);
        this.state = ATTACK;
    }
    updateStep({ done, value }) {
        this.volume = value;
        if (done) {
            if (this.state == ATTACK) {
                this.getValue = countdownIterator_1.default(this.env.decay * 2, this.volume, this.env.sustain);
            }
            this.state++;
        }
        return this.volume;
    }
    next() {
        if (!this.live) {
            return 0;
        }
        switch (this.state) {
            case ATTACK:
            case DEACY:
                this.updateStep(this.getValue.next());
            case SUSTAIN:
                return this.volume;
            default:
                let release = this.getValue.next();
                this.live = !release.done;
                return release.value;
        }
    }
    restart() {
        this.live = true;
        this.state = ATTACK;
        this.volume = 1;
        this.getValue = countdownIterator_1.default(this.env.attack * 2, 0, 1);
    }
    end() {
        this.getValue = countdownIterator_1.default(this.env.release * 2, this.volume, 0);
        this.state = RELEASE;
    }
}
exports.default = Envelope;
