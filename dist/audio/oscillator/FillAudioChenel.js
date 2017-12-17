"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SafeWaveValue_1 = require("./SafeWaveValue");
function FillAudioChenel(out, osclist, timeLine) {
    var i, length = out.length;
    var n, oscCount = osclist.length;
    for (i = 0; i < length; ++i) {
        var value = 0;
        for (n = 0; n < oscCount; ++n) {
            value += osclist[n].next();
        }
        timeLine.next();
        out[i] = SafeWaveValue_1.default(value);
    }
}
exports.default = FillAudioChenel;
