"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = createMelodySet;

var _setNote = require("./setNote");

var _setNote2 = _interopRequireDefault(_setNote);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createMelodySet(rowArray) {
	var midi = [];
	rowArray.forEach(function (quarter, i) {
		if (quarter) {
			quarter.forEach(function (note) {
				(0, _setNote2.default)(midi, i * 8, note);
			});
		}
	});
	return midi;
};