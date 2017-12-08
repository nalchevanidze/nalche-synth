"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = filterBuilder;

var _MoogSampler = require("./MoogSampler");

var _MoogSampler2 = _interopRequireDefault(_MoogSampler);

var _Context = require("../Context");

var _Context2 = _interopRequireDefault(_Context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sampleRate = _Context2.default.sampleRate;
//const bufferSize = 2048;
// cutoff between 0.0 and 1.0
//resonance between 0.0 and 4.0

function filterBuilder(_ref) {
	var env = _ref.env,
	    filter = _ref.filter;


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
		if (!filter.on) {
			return input;
		}
		envelope();

		var ff = Math.max(Math.pow(maxCutoff - (maxCutoff - f) * filter.envelope, 2), 0.02);

		if (filter.envelope === 0) {
			ff = filter.cutoff;
		}

		return filterSample(input, ff, res);
	}
	return {
		next: next,
		set: function set() {
			var _env$filter = env.filter,
			    decay = _env$filter.decay,
			    sustain = _env$filter.sustain,
			    attack = _env$filter.attack;

			f = 0.1;
			maxCutoff = filter.cutoff * 1.16;
			res = filter.resonance;
			type = "attack";
			decayStep = Math.min(1, 1 / (sampleRate * decay));
			attackStep = Math.min(1, 1 / (sampleRate * attack));
			threshhold = Math.max(sustain * maxCutoff, 0.001);
		}
	};
}