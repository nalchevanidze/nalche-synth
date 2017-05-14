import Context from "../Context";
import FillAudioChenel from "./FillAudioChenel";
const { sampleRate, destination } = Context;
import NoteToFrequency from "./NoteToFrequency";
import SoundEvent from "./SoundEvent";

export default function Oscillator() {
    const node = Context.createScriptProcessor(1024, 1, 1);
    let events =  [ SoundEvent() ];
    node.onaudioprocess = function ({ outputBuffer }) {
        let audio = outputBuffer.getChannelData(0);
        if (events[0].eventTimes.live) {
            FillAudioChenel(audio,events);
        } else {
            audio.fill(0);
        }
    };
    node.start = function (param) {
        let frequency = NoteToFrequency(param.note)
        events[0].reset(frequency);
    }
    node.end =  function (){
        events[0].end();
    }
    node.isActive =  e => events[0].eventTimes.live;
    node.connect(destination);
    return node;
}