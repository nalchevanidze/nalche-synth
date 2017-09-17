"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.default = WaveForm;

var _Controller = require("../Controller");

var _Controller2 = _interopRequireDefault(_Controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function WaveForm(WaveIndex) {
   var _Controller$wave = _Controller2.default.wave,
       sine = _Controller$wave.sine,
       square = _Controller$wave.square,
       saw = _Controller$wave.saw,
       saw2 = _Controller$wave.saw2,
       noise = _Controller$wave.noise,
       tech = _Controller$wave.tech;


   var mixin = 0;
   var i = 0;

   if (sine) {
      mixin += sine * Math.sin(WaveIndex * Math.PI * 2);
      i += sine;
   }
   if (square) {
      mixin += square * (Number(WaveIndex > 0.7) * 2 - 1);
      i += square;
   }
   if (saw) {
      mixin += saw * (1 - WaveIndex * 2);
      i += saw;
   }
   if (saw2) {
      mixin += saw2 * (1 - WaveIndex * 2 % 1 * 2);
      i += saw2;
   }
   if (noise) {
      mixin += noise * (1 - Math.random() * 2);
      i += noise;
   }

   if (tech) {
      var wave = 0;
      if (WaveIndex < 0.15) wave = Math.min((0.05 - WaveIndex % 0.05) * 50 - 0.7, 1);
      mixin += wave * tech;
      i += tech;
   }

   if (i == 0) return 0;
   // mix
   return mixin / i;
}