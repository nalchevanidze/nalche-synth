"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SoundEvent_1 = require("./SoundEvent");
function OSCManager(controller) {
    const stack = Array.from({ length: 6 }, () => SoundEvent_1.default(controller));
    const getOsc = (isActive) => stack.filter(osc => isActive === osc.envelope.live);
    return {
        active: () => getOsc(true),
        clear() {
            stack.forEach(osc => osc.end());
        },
        getOsc(note) {
            let osc = getOsc(false)[0];
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
