"use strict";

Object.defineProperty(exports, "__esModule", {
        value: true
});
exports.default = EnvelopeParameter;

var _Context = require("../Context");

var _Context2 = _interopRequireDefault(_Context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [EnvelopeParameter].map(regeneratorRuntime.mark);

var sampleRate = _Context2.default.sampleRate;
function EnvelopeParameter() {
        var SampleLifeTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.5;
        var start_value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        var end_value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var difference, curve, left, level;
        return regeneratorRuntime.wrap(function EnvelopeParameter$(_context) {
                while (1) {
                        switch (_context.prev = _context.next) {
                                case 0:
                                        if (!(SampleLifeTime === 0)) {
                                                _context.next = 2;
                                                break;
                                        }

                                        return _context.abrupt("return", end_value);

                                case 2:
                                        difference = end_value - start_value;
                                        curve = 1;


                                        SampleLifeTime = SampleLifeTime * sampleRate;

                                        left = 0;

                                case 6:
                                        if (!(++left < SampleLifeTime)) {
                                                _context.next = 12;
                                                break;
                                        }

                                        // Level Modyfied by Curve
                                        level = Math.pow(left / SampleLifeTime, curve);
                                        _context.next = 10;
                                        return start_value + difference * level;

                                case 10:
                                        _context.next = 6;
                                        break;

                                case 12:
                                        return _context.abrupt("return", end_value);

                                case 13:
                                case "end":
                                        return _context.stop();
                        }
                }
        }, _marked[0], this);
}