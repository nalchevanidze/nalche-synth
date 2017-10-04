"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = OSCManager;

var _SoundEvent = require("./SoundEvent");

var _SoundEvent2 = _interopRequireDefault(_SoundEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OSCManager(Controller) {

	var stack = Array.from({ length: 6 }, function () {
		return (0, _SoundEvent2.default)(Controller);
	});

	var getFreeOsc = function getFreeOsc() {
		return stack.filter(function (osc) {
			return !osc.eventTimes.live;
		})[0];
	};

	return {
		active: function active() {
			return stack.filter(function (osc) {
				return osc.eventTimes.live;
			});
		},
		clear: function clear() {
			stack.forEach(function (osc) {
				return osc.end();
			});
		},
		getOsc: function getOsc() {
			var osc = getFreeOsc();
			if (!osc) {
				osc = (0, _SoundEvent2.default)(Controller);
				stack.push(osc);
			}
			return osc;
		}
	};
}