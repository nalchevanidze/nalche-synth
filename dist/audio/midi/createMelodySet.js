"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setNote_1 = require("./setNote");
function createMelodySet(rowArray) {
    let midi = [];
    rowArray.forEach((quarter, i) => {
        if (quarter) {
            quarter.forEach((note) => {
                setNote_1.default(midi, i * 8, note);
            });
        }
    });
    console.log(midi);
    return midi;
}
exports.default = createMelodySet;
