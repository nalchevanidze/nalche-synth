"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = NoteToFrequency;
function NoteToFrequency(index) {
  index = Number(index);
  if (Number.isNaN(index)) throw new Error("Invalid Note");
  var pow = (index - 49) / 12;
  return Math.pow(2, pow) * 440;
}