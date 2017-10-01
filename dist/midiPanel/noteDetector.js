"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var keys = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

var list = [].concat(_toConsumableArray(keys.map(function (note) {
	return note + "1";
})), _toConsumableArray(keys.map(function (note) {
	return note + "2";
})), _toConsumableArray(keys.map(function (note) {
	return note + "3";
})));

exports.default = {
	indexOf: function indexOf(note) {
		return list.indexOf(note.id) + 1;
	},
	idByIndex: function idByIndex(index) {

		return list[index];
	}
};