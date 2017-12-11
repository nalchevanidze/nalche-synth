"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Context_1 = require("../../Context");
let { sampleRate } = Context_1.default;
function* countdownIterator(SampleLifeTime = 0.5, startValue = 1, endValue = 0) {
    if (SampleLifeTime === 0) {
        return endValue;
    }
    let curve = 2;
    let left = 0;
    let difference = endValue - startValue;
    SampleLifeTime = SampleLifeTime * Context_1.default.sampleRate;
    while (++left < SampleLifeTime) {
        let level = Math.pow((left / SampleLifeTime), curve);
        yield startValue + difference * level;
    }
    return endValue;
}
exports.default = countdownIterator;
