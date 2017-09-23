import Context from "../Context";
import Controller from "../Controller";
const { filter, env } = Controller;
import EnvelopeParameter from "./EnvelopeParameter";
// cutoff between 0.0 and 1.0
//resonance between 0.0 and 4.0
import MoogSampler from "./MoogSampler";

const bufferSize = 4096;
export default function MoogFilter() {
    var node = Context.createScriptProcessor(bufferSize, 1, 1);
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
    const filterSample = MoogSampler();
    
    node.onaudioprocess = function (audio) {
        var input = audio.inputBuffer.getChannelData(0);
        var output = audio.outputBuffer.getChannelData(0);
        let inputSample;

        //envelope
        let { decay , sustain } = env.filter;
        let time = 80 * decay;
        let k = (100000 + time) / 100080;
        let threshhold = Math.max(sustain * filter.cutoff,0.01)
        //main loop
        for (var i = 0; i < bufferSize; i++) {

            if ( f > threshhold ) {
                f *= k;
            }

            fb = filter.resonance * (1.0 - 0.15 * f * f);
            inputSample = input[i];
            output[i] = filterSample(inputSample, f, fb);
        }
    }
    return node;
};