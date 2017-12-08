let sequence: number[][] = [
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
	[1],
	[2],
	[3],
	[2],
	[],
	[]
];
let arpIndex: number = 0;

function sequencer() {
	arpIndex = 0;
	let endIndex:number = sequence.length;
	return {
		next(notes) {
			let chord = [];
			let maxNotes = notes.size;

			let values = Array.from(notes).sort(
				(a, b) => a > b ? 1 : -1
			);

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
let steps:number = 2;

export default class Sequencer {

	constructor() {
		this.state = 0;
		this.setSequence = this.setSequence.bind(this);
		this.restart = this.restart.bind(this);
	}

	next(main) {
		if (this.state >= steps) {

			let chord = seq.next(main.active);

			oldChord.forEach(
				v => main.simpleUnset(v)
			);

			chord.forEach(
				v => main.simpleSet(v)
			);

			oldChord = chord;
			this.state = 0;
		}
		this.state++;
	}
	setSequence(seq) {
		this.sequence = seq;
		sequence = seq;
	}

	restart() {
		arpIndex = 0;
	}
}