"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const keys = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
function keysToIndexes(note) {
    const indexPosition = note.length - 1;
    const octaveIndex = Number(note.charAt(indexPosition));
    note = note.slice(0, indexPosition);
    const keyindex = keys.indexOf(note.toUpperCase());
    if (keyindex === -1) {
        throw new Error("invalid Note");
    }
    return (keyindex + octaveIndex * 12);
}
exports.default = keysToIndexes;
