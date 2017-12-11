"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WaveForm_1 = require("./WaveForm");
var Envelope_1 = require("./Envelope");
var WaveLooper_1 = require("./WaveLooper");
var MoogFilter_1 = require("./MoogFilter");
var NoteToFrequency_1 = require("./NoteToFrequency");
var Noise = function () { return 1 - Math.random() * 2; };
var Sine = function (i) { return Math.sin(i * Math.PI * 2); };
function SoundEvent(controller) {
    var wave = controller.wave;
    var maxVoices = 12;
    var maxOffset = 2;
    var filter = MoogFilter_1.default(controller);
    var sinePosition = new WaveLooper_1.default();
    var positions = Array.from({ length: maxVoices }, function () { return new WaveLooper_1.default(); });
    var envelope = new Envelope_1.default(controller.envelope);
    var count = 0;
    function multyVoices() {
        var value = 0;
        var size = count;
        for (var i = 0; i <= count; i++) {
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
        var middle = Math.floor((count + 1) / 2);
        for (var i = 0; i <= count; i++) {
            var value = i - middle;
            var diff = value * wave.offset * maxOffset;
            positions[i].set(frequency + diff, wave.fm, wave.fmFreq);
        }
        sinePosition.set(frequency, wave.fm, wave.fmFreq);
        envelope.restart();
        filter.set();
    }
    var next = function () { return envelope.next() * filter.next(multyVoices()); };
    return {
        envelope: envelope,
        next: next,
        reset: reset,
        setNote: function (note) {
            var range = Math.max(note + (Math.floor(wave.pitch * 8) - 4) * 12, 0);
            reset(NoteToFrequency_1.default(range));
        },
        end: envelope.end.bind(envelope)
    };
}
exports.default = SoundEvent;
