"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const keysToIndexes_1 = require("../../keysToIndexes");
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
    let start = startIndex + note.at;
    let end = start + note.length;
    setValue(midi, start, "start", note.id);
    setValue(midi, end - 1, "end", note.id);
}
exports.default = setNote;
