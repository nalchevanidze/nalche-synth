"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Context_1 = require("../../Context");
var sampleRate = Context_1.default.sampleRate;
var counter = 0;
var subStep = 0;
var Tempo = (function () {
    function Tempo() {
        this.BPM = 130;
        subStep = 1 / (60 * sampleRate / (this.BPM * 8));
    }
    Object.defineProperty(Tempo.prototype, "BMP", {
        set: function (beatsPerMinute) {
            this.BMP = beatsPerMinute;
            subStep = 1 / (60 * sampleRate / (beatsPerMinute * 8));
        },
        enumerable: true,
        configurable: true
    });
    Tempo.prototype.next = function () {
        counter += subStep;
        if (counter > 1) {
            counter = 0;
            return true;
        }
        return false;
    };
    return Tempo;
}());
exports.default = Tempo;
