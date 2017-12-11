"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Context_1 = require("../Context");
var sampleRate = Context_1.default.sampleRate;
function Rescale(value, deep) {
    deep = 2 / (Math.pow(deep, 2));
    return (value + deep) / deep;
}
var WaveLooper = (function () {
    function WaveLooper() {
        this.freq = 0;
        this.next = this.next.bind(this);
        this.state = 0;
        this.stepSize = 0.1;
        this.FM = {
            state: 0,
            level: 0,
            freq: 0.25,
            stepSize: 0.1
        };
    }
    WaveLooper.prototype.set = function (freq, FMLevel, FMFreq) {
        if (freq === void 0) { freq = 440; }
        if (FMLevel === void 0) { FMLevel = 1; }
        this.FM.freq = (FMFreq !== undefined) ?
            FMFreq * 4 : this.FM.freq;
        if (this.FM.freq === 0) {
            this.FM.freq = 1 / 16;
        }
        this.freq = freq;
        this.state = 0;
        this.state = Math.random();
        this.stepSize = freq / sampleRate;
        this.FM.stepSize = this.stepSize * this.FM.freq;
        this.FM.state = 0;
        this.FM.level = FMLevel;
    };
    WaveLooper.prototype.next = function () {
        var _a = this, state = _a.state, stepSize = _a.stepSize, FM = _a.FM;
        state += stepSize;
        this.state = state % 1;
        if (FM.level === 0) {
            return state;
        }
        FM.state = FM.state + FM.stepSize;
        var FMWaveFormPosition = Math.sin(FM.state);
        return this.state * Rescale(FMWaveFormPosition, FM.level);
    };
    return WaveLooper;
}());
exports.default = WaveLooper;
