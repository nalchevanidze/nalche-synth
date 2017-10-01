"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Context = require("../Context");

var _Context2 = _interopRequireDefault(_Context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var sampleRate = _Context2.default.sampleRate;


function Rescale(value, deep) {
	deep = 2 / Math.pow(deep, 2);
	return (value + deep) / deep;
}

var WaveLooper = function () {
	function WaveLooper() {
		_classCallCheck(this, WaveLooper);

		this.freq = 0;
		this.next = this.next.bind(this);
		this.state = 0;
		this.stepSize = 0.1;
		this.FM = {
			state: 0,
			level: 0,
			freq: 0.25
		};
	}

	_createClass(WaveLooper, [{
		key: "set",
		value: function set() {
			var freq = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 440;
			var FMLevel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
			var FMFreq = arguments[2];


			this.FM.freq = FMFreq !== undefined ? FMFreq * 4 : this.FM.freq;

			if (this.FM.freq === 0) {
				this.FM.freq = 1 / 16;
			}

			this.freq = freq;
			this.state = 0;

			//unision
			this.state = Math.random();
			// this.state = Controller.wave.offset;


			//this
			this.stepSize = freq / sampleRate;
			this.FM.stepSize = this.stepSize * this.FM.freq;
			this.FM.state = 0;
			this.FM.level = FMLevel;
		}
	}, {
		key: "next",
		value: function next() {
			var state = this.state,
			    stepSize = this.stepSize,
			    FM = this.FM;

			// generate new wavePosition

			state += stepSize;
			this.state = state % 1;

			// new Fm Position
			if (FM.level === 0) {
				return state;
			}
			FM.state = FM.state + FM.stepSize;
			var FMWaveFormPosition = Math.sin(FM.state);

			return this.state * Rescale(FMWaveFormPosition, FM.level);
		}
	}]);

	return WaveLooper;
}();

exports.default = WaveLooper;