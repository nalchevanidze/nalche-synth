"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Context = new (window.AudioContext || window.webkitAudioContext)();
exports.default = Context;