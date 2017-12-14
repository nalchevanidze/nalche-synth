"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let sequence = [[]];
let endIndex = sequence.length;
let arpIndex = 0;
function sequencer() {
    arpIndex = 0;
    return {
        next(notes) {
            let chord = [];
            let maxNotes = notes.size;
            let values = Array.from(notes).sort((a, b) => a > b ? 1 : -1);
            if (maxNotes) {
                chord = sequence[arpIndex].map((i) => {
                    i--;
                    const octave = 12 * Math.floor(i / maxNotes);
                    const selectIndex = i % maxNotes;
                    return values[selectIndex] + octave;
                });
            }
            arpIndex++;
            if (arpIndex >= endIndex) {
                arpIndex = 0;
            }
            return chord;
        }
    };
}
class Sequencer {
    constructor(initialSequence = [[]]) {
        this._steps = 2;
        this.next = (main) => {
            if (this.state >= this._steps) {
                let chord = this._sequenceTaskRunner.next(main.active);
                this._oldChord.forEach(v => main.simpleUnset(v));
                chord.forEach(v => main.simpleSet(v));
                this._oldChord = chord;
                this.state = 0;
            }
            this.state++;
        };
        this.setSequence = (seq) => {
            this.sequence = seq;
            sequence = seq;
            endIndex = sequence.length;
        };
        this.restart = () => {
            arpIndex = 0;
        };
        this.state = 0;
        this.sequence = initialSequence;
        this._sequenceTaskRunner = sequencer();
        this._oldChord = [];
        sequence = initialSequence;
    }
}
exports.default = Sequencer;
