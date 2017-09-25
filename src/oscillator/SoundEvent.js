import Controller from "../Controller";
import WaveForm from "./WaveForm";
import EventTimes from "./EventTimes";
import WaveLooper from "./WaveLooper";

const { wave } = Controller;

export default function SoundEvent() {
    let positions = [];
    const position = new WaveLooper();
    const position2 = new WaveLooper();
    const position3 = new WaveLooper();
    const position4 = new WaveLooper();
    const position5 = new WaveLooper();
    const eventTimes = new EventTimes();
    let oldvalue = 0;
    function reset(frequency) {
        position.set(frequency, wave.fm, wave.fmFreq);
        position2.set(frequency - 1 * wave.offset, wave.fm, wave.fmFreq);
        position3.set(frequency + 1 * wave.offset, wave.fm, wave.fmFreq);
        position4.set(frequency - 2 * wave.offset, wave.fm, wave.fmFreq);
        position5.set(frequency + 2 * wave.offset, wave.fm, wave.fmFreq);
        eventTimes.restart();
    }

    function multyVoices(p) {
        if (wave.voices > 0.75) {
            return (
                WaveForm(position.next(), wave)
                + WaveForm(position2.next(), wave)
                + WaveForm(position3.next(), wave)
                + WaveForm(position4.next(), wave)
                + WaveForm(position5.next(), wave)
            ) / 5
        }
        if (wave.voices > 0.5) {
            return (
                WaveForm(position.next(), wave)
                + WaveForm(position2.next(), wave)
                + WaveForm(position3.next(), wave)
            ) / 3
        }
        if (wave.voices > 0.25) {
            return (
                WaveForm(position.next(), wave)
                + WaveForm(position2.next(), wave)
            ) / 2
        }
        return WaveForm(position.next(), wave);
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