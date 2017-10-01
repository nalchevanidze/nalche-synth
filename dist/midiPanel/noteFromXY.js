"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = noteFromXY;
function noteFromXY(_ref) {
	var x = _ref.x,
	    y = _ref.y;

	var i = Math.floor(1 + (360 - y) / 10);
	var position = Math.floor(x / 5);
	return {
		length: 1,
		i: i,
		position: position
	};
}