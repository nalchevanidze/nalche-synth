let sequence: number[][] = [
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

let arpIndex: number = 0;

function sequencer() {
	arpIndex = 0;
	let endIndex: number = sequence.length;
	return {
		next(notes: Set<number>) {
			let chord: number[] = [];
			let maxNotes: number = notes.size;

			let values = Array.from(notes).sort(
				(a, b) => a > b ? 1 : -1
			);

			if (maxNotes) {
				chord = sequence[arpIndex].map((i) => {
					i--;
					const octave: number = 12 * Math.floor(i / maxNotes);
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

let oldChord: number[] = [];
const seq = sequencer();
let steps: number = 2;

export interface Main {
	active: Set<number>,
	simpleUnset(v: number): void;
	simpleSet(v: number): void;
}

export default class Sequencer {

	private state: number;
	sequence: number[][];

	constructor() {
		this.state = 0;
	}

	next = (main: Main): void => {

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

	setSequence = (seq: number[][]): void => {
		this.sequence = seq;
		sequence = seq;
	}

	restart = (): void => {
		arpIndex = 0;
	}
}