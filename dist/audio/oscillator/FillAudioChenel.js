"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SafeWaveValue_1 = require("./SafeWaveValue");
function FillAudioChenel(out, osclist, timeLine) {
    let i, length = out.length;
    let n, oscCount = osclist.length;
    for (i = 0; i < length; ++i) {
        let value = 0;
        for (n = 0; n < oscCount; ++n) {
            value += osclist[n].next();
        }
        timeLine.next();
        out[i] = SafeWaveValue_1.default(value);
    }
}
exports.default = FillAudioChenel;
