"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = chordToKeys;

var _keysToIndexes = require("./keysToIndexes");

var _keysToIndexes2 = _interopRequireDefault(_keysToIndexes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function chordToKeys(list) {
	return list.map(_keysToIndexes2.default);
}