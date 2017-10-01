"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = setNote;

var _keysToIndexes = require("../keysToIndexes");

var _keysToIndexes2 = _interopRequireDefault(_keysToIndexes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setValue(midi, i, type, value) {

	if (!midi[i]) {
		midi[i] = {
			start: [],
			end: []
		};
	}
	midi[i][type].push((0, _keysToIndexes2.default)(value));
}

function setNote(midi, startIndex, note) {
	var start = startIndex + note.at;
	var end = start + note.length;
	setValue(midi, start, "start", note.id);
	setValue(midi, end, "end", note.id);
}