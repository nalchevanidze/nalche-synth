"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function MoogSampler() {
    var frequency = 0;
    var diff = 0;
    var input = new Float32Array(5);
    var output = new Float32Array(5);
    output.fill(0);
    input.fill(0);
    var pole = function (index) { return (0.3 * input[index] +
        diff * output[index]); };
    return function sampleGenerate(inputSample, inputFrequency, resonance) {
        var fpower = Math.pow(inputFrequency, 2);
        diff = 1 - inputFrequency;
        frequency = (resonance * 4) * (1.0 - 0.15 * fpower);
        inputSample -= output[4] * frequency;
        output[0] = inputSample * (0.35013 * (Math.pow(fpower, 2)));
        for (var i = 0; i < 5; i++) {
            var i2 = i + 1;
            output[i2] = output[i] + pole(i2);
            input[i2] = output[i];
        }
        return output[4];
    };
}
exports.default = MoogSampler;
