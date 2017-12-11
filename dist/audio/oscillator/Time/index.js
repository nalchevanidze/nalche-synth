"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequencer_1 = require("../../sequencer");
const Tempo_1 = require("./Tempo");
const TaskQueue_1 = require("./TaskQueue");
class Time extends TaskQueue_1.default {
    constructor(main) {
        super(main);
        this.next = () => {
            if (this.tempo.next()) {
                if (this.main.isPlayng) {
                    this.nextTask();
                }
                this.runSequencer();
            }
        };
        this.sequencer = new sequencer_1.default();
        this.tempo = new Tempo_1.default();
    }
    runSequencer() {
        if (this.main.seq.on) {
            this.sequencer.next(this.main);
        }
    }
}
exports.default = Time;
