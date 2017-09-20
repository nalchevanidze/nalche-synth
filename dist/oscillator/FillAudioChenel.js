"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = FillAudioChenel;

var _SafeWaveValue = require("./SafeWaveValue");

var _SafeWaveValue2 = _interopRequireDefault(_SafeWaveValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var smoothing = 30;

function FillAudioChenel(out, Sound) {
	var i = void 0,
	    length = out.length;

	for (i = 0; i < length; ++i) {
		out[i] = (0, _SafeWaveValue2.default)(Sound.next());
	}
}