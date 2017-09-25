"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = keysToIndexes;
var keys = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function keysToIndexes(note) {
	var indexPosition = note.length - 1;
	var noteNumber = Number(note.charAt(indexPosition));
	note = note.slice(0, indexPosition);
	var index = keys.indexOf(note.toUpperCase()) + noteNumber * 12;

	if (index === -1) {
		throw new Error("invalid Note");
	}

	return index;
}