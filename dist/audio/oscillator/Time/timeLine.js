"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequencer_1 = require("../sequencer");
const Tempo_1 = require("./Time/Tempo");
const TaskQueue_1 = require("./Time/TaskQueue");
let taskQueue;
const tempo = new Tempo_1.default();
const sequencer = new sequencer_1.default();
class Time extends TaskQueue_1.default {
    constructor(main) {
        super(main);
        this.next = () => {
            let { main } = this;
            if (this.tempo.next()) {
                if (!main.isPlayng) {
                    if (main.seq.on) {
                        sequencer.next(main);
                    }
                }
                else {
                    this.nextTask();
                    if (main.seq.on) {
                        sequencer.next(main);
                    }
                }
            }
        };
        this.sequencer = new sequencer_1.default();
        this.tempo = new Tempo_1.default();
    }
}
exports.default = Time;
