import Context from "../Context";
import Controller from "../Controller";
const { filter } = Controller;
import EnvelopeParameter from "./EnvelopeParameter";

// cutoff between 0.0 and 1.0
//resonance between 0.0 and 4.0

const bufferSize = 4096;
export default function MoogFilter() {
    var node = Context.createScriptProcessor(bufferSize, 1, 1);
    var in1, in2, in3, in4, out1, out2, out3, out4;
    in1 = in2 = in3 = in4 = out1 = out2 = out3 = out4 = 0.0;
    let f, fb, state, envelope;
    node.start = () => {
        state = { done: false, value: 0 };
        envelope = EnvelopeParameter(0.3);
        let { cutoff, resonance } = filter;
        f = cutoff * 1.16;
    }
    node.start();
    function generate() {
        if (state.done) return 0;
        state = envelope.next();
        return state.value;
    }
    let time = 36;
    let k = (100000 + time*2) /100080 ;
    node.onaudioprocess = function (audio) {
        var input = audio.inputBuffer.getChannelData(0);
        var output = audio.outputBuffer.getChannelData(0);

        //main loop
        for (var i = 0; i < bufferSize; i++) {

            if(f>0.025){
                f *= k;
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
    }
    return node;
};