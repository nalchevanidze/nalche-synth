"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var keys = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
function keysToIndexes(note) {
    var indexPosition = note.length - 1;
    var octaveIndex = Number(note.charAt(indexPosition));
    note = note.slice(0, indexPosition);
    var keyindex = keys.indexOf(note.toUpperCase());
    if (keyindex === -1) {
        throw new Error("invalid Note");
    }
    return (keyindex + octaveIndex * 12);
}
exports.default = keysToIndexes;
