"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = noteFromXY;

var _noteDetector = require("./noteDetector");

var _noteDetector2 = _interopRequireDefault(_noteDetector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function noteFromXY(_ref) {
	var x = _ref.x,
	    y = _ref.y;

	// findNote Name
	var noteIndex = Math.floor((360 - y) / 10);
	var id = _noteDetector2.default.idByIndex(noteIndex);
	// Note
	var at = Math.floor(x / 5);
	var index = Math.floor(at / 8);

	at = at % 8;

	return {
		startedAt: x,
		index: index,
		note: {
			at: at,
			length: 1,
			id: id,
			index: index
		}
	};
}