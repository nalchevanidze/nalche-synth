"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = filterBuilder;

var _Controller = require("../Controller");

var _Controller2 = _interopRequireDefault(_Controller);

var _MoogSampler = require("./MoogSampler");

var _MoogSampler2 = _interopRequireDefault(_MoogSampler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var filter = _Controller2.default.filter;
// cutoff between 0.0 and 1.0
//resonance between 0.0 and 4.0

var bufferSize = 2048;

function filterBuilder() {
	var maxCutoff = 1.16;
	var f = void 0,
	    res = void 0,
	    type = void 0;
	var decayStep = void 0,
	    attackStep = void 0,
	    threshhold = void 0;
	var filterSample = (0, _MoogSampler2.default)();

	function envelope() {

		if (type === "attack") {
			f += attackStep;
			if (f >= maxCutoff) {
				type = "decay";
				f = maxCutoff;
			}
		} else if (f > threshhold) {
			f -= decayStep;
		}
	}

	function next(input) {

		if (filter.envelope === 0) {
			return input;
		}

		envelope();
		var ff = Math.max(Math.pow(maxCutoff - (maxCutoff - f) * filter.envelope, 2), 0.02);

		return filterSample(input, ff, res);
	}
	return {
		next: next,
		set: function set() {
			var _Controller$env$filte = _Controller2.default.env.filter,
			    decay = _Controller$env$filte.decay,
			    sustain = _Controller$env$filte.sustain,
			    attack = _Controller$env$filte.attack;

			f = 0.1;
			maxCutoff = filter.cutoff * 1.16;
			res = filter.resonance;
			type = "attack";
			decayStep = Math.min(1, 1 / (bufferSize * 20 * decay));
			attackStep = Math.min(1, 1 / (bufferSize * 40 * attack));
			threshhold = Math.max(sustain * maxCutoff, 0.001);
		}
	};
}