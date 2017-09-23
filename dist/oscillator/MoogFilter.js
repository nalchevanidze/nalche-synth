"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = MoogFilter;

var _Context = require("../Context");

var _Context2 = _interopRequireDefault(_Context);

var _Controller = require("../Controller");

var _Controller2 = _interopRequireDefault(_Controller);

var _EnvelopeParameter = require("./EnvelopeParameter");

var _EnvelopeParameter2 = _interopRequireDefault(_EnvelopeParameter);

var _MoogSampler = require("./MoogSampler");

var _MoogSampler2 = _interopRequireDefault(_MoogSampler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var filter = _Controller2.default.filter,
    env = _Controller2.default.env;
// cutoff between 0.0 and 1.0
//resonance between 0.0 and 4.0

var bufferSize = 4096;
function MoogFilter() {
    var node = _Context2.default.createScriptProcessor(bufferSize, 1, 1);
    var f = void 0,
        fb = void 0,
        state = void 0,
        envelope = void 0;
    node.start = function () {
        state = { done: false, value: 0 };
        envelope = (0, _EnvelopeParameter2.default)(0.3);
        var cutoff = filter.cutoff,
            resonance = filter.resonance;

        f = cutoff * 1.16;
    };
    node.start();
    function generate() {
        if (state.done) return 0;
        state = envelope.next();
        return state.value;
    }
    var filterSample = (0, _MoogSampler2.default)();

    node.onaudioprocess = function (audio) {
        var input = audio.inputBuffer.getChannelData(0);
        var output = audio.outputBuffer.getChannelData(0);
        var inputSample = void 0;

        //envelope
        var _env$filter = env.filter,
            decay = _env$filter.decay,
            sustain = _env$filter.sustain;

        var time = 80 * decay;
        var k = (100000 + time) / 100080;
        var threshhold = Math.max(sustain * filter.cutoff, 0.01);
        //main loop
        for (var i = 0; i < bufferSize; i++) {

            if (f > threshhold) {
                f *= k;
            }

            fb = filter.resonance * (1.0 - 0.15 * f * f);
            inputSample = input[i];
            output[i] = filterSample(inputSample, f, fb);
        }
    };
    return node;
};