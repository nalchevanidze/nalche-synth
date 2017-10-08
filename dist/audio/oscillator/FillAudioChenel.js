"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = FillAudioChenel;

var _SafeWaveValue = require("./SafeWaveValue");

var _SafeWaveValue2 = _interopRequireDefault(_SafeWaveValue);

var _timeLine = require("./timeLine");

var _timeLine2 = _interopRequireDefault(_timeLine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FillAudioChenel(out, osclist, main) {
	var i = void 0,
	    length = out.length;
	var n = void 0,
	    oscCount = osclist.length;
	//console.log(osclist);

	for (i = 0; i < length; ++i) {
		var value = 0;

		for (n = 0; n < oscCount; ++n) {
			value += osclist[n].next();
		}

		_timeLine2.default.next(main);

		out[i] = (0, _SafeWaveValue2.default)(value);
	}
}