"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var setNote_1 = require("./setNote");
function createMelodySet(rowArray) {
    var midi = [];
    rowArray.forEach(function (quarter, i) {
        if (quarter) {
            quarter.forEach(function (note) {
                setNote_1.default(midi, i * 8, note);
            });
        }
    });
    return midi;
}
exports.default = createMelodySet;
