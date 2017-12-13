"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let sequence = [
    [1, 2, 3],
    [],
    [],
    [1, 2, 3],
    [],
    [],
    [1, 2, 3],
    [],
    [],
    [1, 2, 3],
    [],
    [],
    [1, 2, 3],
    [],
    [1, 2, 3],
    [],
    [],
];
let arpIndex = 0;
function sequencer() {
    arpIndex = 0;
    let endIndex = sequence.length;
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
let oldChord = [];
const seq = sequencer();
let steps = 2;
class Sequencer {
    constructor() {
        this.next = (main) => {
            if (this.state >= steps) {
                let chord = seq.next(main.active);
                oldChord.forEach(v => main.simpleUnset(v));
                chord.forEach(v => main.simpleSet(v));
                oldChord = chord;
                this.state = 0;
            }
            this.state++;
        };
        this.setSequence = (seq) => {
            this.sequence = seq;
            sequence = seq;
        };
        this.restart = () => {
            arpIndex = 0;
        };
        this.state = 0;
    }
}
exports.default = Sequencer;
