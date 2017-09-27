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
    let f, fb, state, envelope, type;
    let maxCutoff = 1.16;

    node.start = () => {
        state = { done: false, value: 0 };
        envelope = EnvelopeParameter(0.3);
        let { cutoff, resonance } = filter;
        type = "attack";
        maxCutoff = cutoff * 1.16;
        f = 0.1;
    }
    node.start();

    function generate() {
        if (state.done) return 0;
        state = envelope.next();
        return state.value;
    }
    const filterSample = MoogSampler();

    node.onaudioprocess = function (audio) {

        const input = audio.inputBuffer.getChannelData(0);
        const output = audio.outputBuffer.getChannelData(0);

        

        if (filter.envelope > 0){
            


            
            let inputSample;
            //envelope
            let { decay, sustain, attack } = env.filter;
            let decayStep = Math.min(1, 1 / (bufferSize * 20 * decay));
            let attackStep = Math.min(1, 1 / (bufferSize * 40 * attack));
            let threshhold = Math.max(sustain * maxCutoff, 0.001);
            //main loop
            for (var i = 0; i < bufferSize; i++) {

                // generate
                if (type == "attack") {
                    f += attackStep;
                    if (f >= maxCutoff) {
                        type = "decay";
                        f = maxCutoff;
                    }

                } else if (f > threshhold) {
                    f -= decayStep;
                    f = Math.max(f, 0.01);
                }
                inputSample = input[i];
                output[i] = filterSample(
                    inputSample,
                    maxCutoff - (maxCutoff - f) * filter.envelope,
                    filter.resonance
                );
            }
        }else{
            output.set(input);
        }

    }
    return node;
};