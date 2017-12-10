"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WaveForm_1 = require("./WaveForm");
const Envelope_1 = require("./Envelope");
const WaveLooper_1 = require("./WaveLooper");
const MoogFilter_1 = require("./MoogFilter");
const NoteToFrequency_1 = require("./NoteToFrequency");
const Noise = () => 1 - Math.random() * 2;
const Sine = (i) => Math.sin(i * Math.PI * 2);
function SoundEvent(controller) {
    const { wave } = controller;
    const maxVoices = 12;
    const maxOffset = 2;
    const filter = MoogFilter_1.default(controller);
    const sinePosition = new WaveLooper_1.default();
    const positions = Array.from({ length: maxVoices }, () => new WaveLooper_1.default());
    const envelope = new Envelope_1.default(controller.envelope);
    let count = 0;
    function multyVoices() {
        let value = 0;
        let size = count;
        for (let i = 0; i <= count; i++) {
            value += WaveForm_1.default(positions[i].next(), wave);
        }
        if (wave.sine) {
            value += (Sine(sinePosition.next()) * wave.sine);
            size++;
        }
        if (wave.noise > 0) {
            return (value + wave.noise * Noise()) / (size + 1 + wave.noise);
        }
        return value / (size + 1);
    }
    function reset(frequency) {
        count = wave.voices * (maxVoices - 1);
        let middle = Math.floor((count + 1) / 2);
        for (let i = 0; i <= count; i++) {
            let value = i - middle;
            let diff = value * wave.offset * maxOffset;
            positions[i].set(frequency + diff, wave.fm, wave.fmFreq);
        }
        sinePosition.set(frequency, wave.fm, wave.fmFreq);
        envelope.restart();
        filter.set();
    }
    const next = () => envelope.next() * filter.next(multyVoices());
    return {
        envelope,
        next,
        reset,
        setNote(note) {
            let range = Math.max(note + (Math.floor(wave.pitch * 8) - 4) * 12, 0);
            reset(NoteToFrequency_1.default(range));
        },
        end: envelope.end.bind(envelope)
    };
}
exports.default = SoundEvent;
