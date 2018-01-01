"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var keysToIndexes_1 = require("../../keysToIndexes");
function setValue(midi, i, type, value) {
    if (!midi[i]) {
        midi[i] = {
            start: [],
            end: []
        };
    }
    midi[i][type].push(keysToIndexes_1.default(value));
}
function setNote(midi, startIndex, note) {
    var start = startIndex + note.at;
    var end = start + note.length;
    var setByIndex = function (index, method) { return setValue(midi, index, method, note.id); };
    setByIndex(start, "start");
    setByIndex(end - 1, "end");
}
exports.default = setNote;
