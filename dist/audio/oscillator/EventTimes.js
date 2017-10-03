"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EnvelopeParameter = require("./EnvelopeParameter");

var _EnvelopeParameter2 = _interopRequireDefault(_EnvelopeParameter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventTimes = function () {
	function EventTimes(env) {
		_classCallCheck(this, EventTimes);

		this.env = env;
		this.atack = null;
		this.release = null;
		this.live = false;
		this.sustain = 0;
		this.active = false;
		this.volume = 0;
		this.restart = this.restart.bind(this);
		this.next = this.next.bind(this);
		this.end = this.end.bind(this);
		this.StepUpdate = this.StepUpdate.bind(this);
		this.state = null;
	}

	_createClass(EventTimes, [{
		key: "StepUpdate",
		value: function StepUpdate(_ref, NextState) {
			var done = _ref.done,
			    value = _ref.value;

			this.volume = value;
			if (done) {
				this.state = NextState;
			}
			return this.volume;
		}
	}, {
		key: "next",
		value: function next() {
			// if Inactive
			if (!this.live) {
				return 0;
			}
			//  Pressed 
			if (this.active) {
				if (this.state === null) {
					this.attack = this.attack || (0, _EnvelopeParameter2.default)(this.env.attack, 0, 1);
					var attack = this.attack.next();
					return this.StepUpdate(attack, "decay");
				} else if (this.state === "decay") {
					this.decay = this.decay || (0, _EnvelopeParameter2.default)(this.env.decay, this.volume, this.sustain);
					var decay = this.decay.next();
					return this.StepUpdate(decay, "release");
				}
			}

			// After Press
			if (this.active) {
				return this.volume;
			}
			this.release = this.release || (0, _EnvelopeParameter2.default)(this.env.release, this.volume, 0);
			var release = this.release.next();
			this.live = !release.done;
			return release.value;
		}
	}, {
		key: "restart",
		value: function restart() {
			this.live = true;
			this.state = null;
			this.active = true;
			this.sustain = this.env.sustain;
			this.volume = 1;
			this.attack = null;
			this.release = null;
			this.decay = null;
		}
	}, {
		key: "end",
		value: function end() {
			this.active = false;
		}
	}]);

	return EventTimes;
}();

exports.default = EventTimes;