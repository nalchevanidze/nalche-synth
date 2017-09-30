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
	var i = Math.floor(1 + (360 - y) / 10);
	var id = _noteDetector2.default.idByIndex(i);
	// Note
	var position = Math.floor(x / 5);

	return {
		length: 1,
		i: i,
		position: position
	};
}