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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var filter = _Controller2.default.filter;


// cutoff between 0.0 and 1.0
//resonance between 0.0 and 4.0

var bufferSize = 4096;
function MoogFilter() {
    var node = _Context2.default.createScriptProcessor(bufferSize, 1, 1);
    var in1, in2, in3, in4, out1, out2, out3, out4;
    in1 = in2 = in3 = in4 = out1 = out2 = out3 = out4 = 0.0;

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

    node.onaudioprocess = function (audio) {
        var input = audio.inputBuffer.getChannelData(0);
        var output = audio.outputBuffer.getChannelData(0);

        //main loop
        for (var i = 0; i < bufferSize; i++) {

            if (f > 0.02) {
                f *= 0.99983;
            }

            fb = filter.resonance * (1.0 - 0.15 * f * f);

            input[i] -= out4 * fb;
            input[i] *= 0.35013 * (f * f) * (f * f);
            out1 = input[i] + 0.3 * in1 + (1 - f) * out1; // Pole 1
            in1 = input[i];
            out2 = out1 + 0.3 * in2 + (1 - f) * out2; // Pole 2
            in2 = out1;
            out3 = out2 + 0.3 * in3 + (1 - f) * out3; // Pole 3
            in3 = out2;
            out4 = out3 + 0.3 * in4 + (1 - f) * out4; // Pole 4
            in4 = out3;
            output[i] = out4;
        }
    };
    return node;
};