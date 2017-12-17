"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SoundEvent_1 = require("./SoundEvent");
function OSCManager(controller) {
    var stack = Array.from({ length: 6 }, function () { return SoundEvent_1.default(controller); });
    var getOsc = function (isActive) { return stack.filter(function (osc) { return isActive === osc.envelope.live; }); };
    return {
        active: function () { return getOsc(true); },
        clear: function () {
            stack.forEach(function (osc) { return osc.end(); });
        },
        getOsc: function (note) {
            var osc = getOsc(false)[0];
            if (!osc) {
                osc = SoundEvent_1.default(controller);
                stack.push(osc);
            }
            osc.setNote(note);
            return osc;
        }
    };
}
exports.default = OSCManager;
