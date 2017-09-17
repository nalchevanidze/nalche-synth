import Context from "../Context";
import FillAudioChenel from "./FillAudioChenel";
const { sampleRate, destination } = Context;
import NoteToFrequency from "./NoteToFrequency";
import SoundEvent from "./SoundEvent";

export default function Oscillator() {
    
    const node = Context.createScriptProcessor(1024, 1, 1);
    const event =  SoundEvent() ;
    
    node.onaudioprocess = function ({ outputBuffer }) {
        
        let audio = outputBuffer.getChannelData(0);
        if (event.eventTimes.live) {
            FillAudioChenel(audio,event);
        } else {
            audio.fill(0);
        }
        
    };
    
    node.start = function (param) {
        
        let frequency = NoteToFrequency(param.note)
        event.reset(frequency);
        
    }
    
    node.end =  function (){
        
        event.end();
        
    }
    
    node.isActive =  e => event.eventTimes.live;
    
    node.connect(destination);
    
    return node;
    
}