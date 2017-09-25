import Context from "../Context";
import FillAudioChenel from "./FillAudioChenel";
const { sampleRate, destination } = Context;
import NoteToFrequency from "./NoteToFrequency";
import SoundEvent from "./SoundEvent";
import EnvelopeParameter from "./EnvelopeParameter";
const quality = 1024; //1024;
const bufferSize = quality; //4096;
import Controller from "../Controller";
import EventTimes from "./EventTimes";
import MoogFilter from "./MoogFilter";


export default function Oscillator() {

    const event = SoundEvent();
    const filter = MoogFilter();
    function onProcess({ outputBuffer }) {
        let audio = outputBuffer.getChannelData(0);
        if (event.eventTimes.live) {
            FillAudioChenel(audio, event);
        } else {
            audio.fill(0);
        }
    }

    const node = Context.createScriptProcessor(2048, 1, 1);
    node.connect(filter);
    filter.connect(destination);
    node.onaudioprocess = onProcess;


    return {
        start(param) {
            let frequency = NoteToFrequency(param.note)
            event.reset(frequency);
            filter.start();
        },
        end() {
            event.end();
        },
        isActive() {
            return event.eventTimes.live
        }
    };
}