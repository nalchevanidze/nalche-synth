export default function MoogSampler() {
    let in1, in2, in3, in4, out1, out2, out3, out4;
    in1 = in2 = in3 = in4 = out1 = out2 = out3 = out4 = 0;
    let fb = 0;

    return function sampleGenerate(inputSample, f, resonance) {

        fb = (resonance * 4) * (1.0 - 0.15 * f * f);

        inputSample -= out4 * fb;

        inputSample *= 0.35013 * (f ** 4);
        out1 = inputSample + 0.3 * in1 + (1 - f) * out1; // Pole 1

        in1 = inputSample;
        out2 = out1 + 0.3 * in2 + (1 - f) * out2; // Pole 2

        in2 = out1;
        out3 = out2 + 0.3 * in3 + (1 - f) * out3; // Pole 3

        in3 = out2;
        out4 = out3 + 0.3 * in4 + (1 - f) * out4; // Pole 4

        in4 = out3;
        return out4;
    }

};