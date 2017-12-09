"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Context_1 = require("../Context");
let { sampleRate } = Context_1.default;
function* EnvelopeParameter(SampleLifeTime = 0.5, startValue = 1, endValue = 0) {
    if (SampleLifeTime === 0) {
        return endValue;
    }
    let curve = 1;
    let left = 0;
    let difference = endValue - startValue;
    SampleLifeTime = SampleLifeTime * sampleRate;
    //main loop
    while (++left < SampleLifeTime) {
        // Level Modyfied by Curve
        let level = Math.pow((left / SampleLifeTime), curve);
        yield startValue + difference * level;
    }
    return endValue;
}
exports.default = EnvelopeParameter;
