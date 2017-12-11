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
    setValue(midi, start, "start", note.id);
    setValue(midi, end, "end", note.id);
}
exports.default = setNote;
