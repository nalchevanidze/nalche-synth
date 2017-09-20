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

    let state , envelope;

    node.start = ()=>{
      state = {done:false, value:1};
      envelope = EnvelopeParameter();
    }

    node.start();

    function generate(){
        if(state.done) return 0;
        state = envelope.next();
        return state.value;
    }

    node.onaudioprocess = function (audio) {
        var input = audio.inputBuffer.getChannelData(0);
        var output = audio.outputBuffer.getChannelData(0);

        // parameters
        let { cutoff, resonance } = filter;
        var f = cutoff * 1.16;
        var fb = resonance * (1.0 - 0.15 * f * f);


        //main loop
        for (var i = 0; i < bufferSize; i++) {

           // generate();


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