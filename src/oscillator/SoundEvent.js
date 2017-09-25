import Controller from "../Controller";
import WaveForm from "./WaveForm";
import EventTimes from "./EventTimes";
import WaveLooper from "./WaveLooper";

const { wave  } = Controller;

export default function SoundEvent() {

    const position = new WaveLooper();
    const eventTimes = new EventTimes();
    let oldvalue = 0;

    function reset(frequency) {
        position.set(frequency, wave.fm, wave.fmFreq);
        eventTimes.restart();
    }

    function multyVoices(p) {
        let voices = 1+Math.round(5*wave.voices);
        let value = 0;
        let vocieOffset =  1/voices;

        for (let i = 1; i <= voices ; i++) {
            value+=WaveForm( p*i*vocieOffset, wave)
        }

        return value / voices ;
    }
    function next() {
        let p = position.next();
        return (
            eventTimes.next() * multyVoices(p)
        );

    }
    function end() {
        eventTimes.end();
    }

    return { position, eventTimes, next, reset, end };

}