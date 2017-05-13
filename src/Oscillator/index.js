import EventTimes from "./EventTimes";
import WaveLooper from "./WaveLooper";
import Context from "../Context";
import FillAudioChenel from "./FillAudioChenel";
const { sampleRate, destination } = Context;
import Controller from "../Controller";
import WaveForm from "./WaveForm";
import NoteToFrequency from "./NoteToFrequency";


export default function Oscillator() {
    const node = Context.createScriptProcessor(1024, 1, 1);
    const eventTimes = new EventTimes();
    const position = new WaveLooper();
    let active = false ;
    let parameters = null ;
    function makeStep (){
        return  eventTimes.next() *  WaveForm( position.next() , parameters.wave );
    }
    node.onaudioprocess = function ({ outputBuffer }) {
        let audio = outputBuffer.getChannelData(0);
        if (eventTimes.live) {
            FillAudioChenel(audio, makeStep  );
        } else {
            audio.fill(0);
        }
    };
    node.start = function (param) {
        let frequency = NoteToFrequency(param.note)
        parameters = param;
        parameters.freq = frequency;
        position.set( frequency , Controller.wave.fm );
        eventTimes.restart();
    }
    node.end =  function (){
        eventTimes.end();
    }
    node.isActive =  e => eventTimes.live;
    node.connect(destination);
    return node;
}