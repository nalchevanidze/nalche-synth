let sequence: number[][] = [[]];
let endIndex: number = sequence.length;
let arpIndex: number = 0;

function sequencer() {
	arpIndex = 0;
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


export interface Main {
	active: Set<number>,
	simpleUnset(v: number): void;
	simpleSet(v: number): void;
}

export default class Sequencer {

	private state: number;
	private _sequenceTaskRunner: {next(notes: Set<number>):any}
	private _oldChord:number[];
	private readonly _steps:number = 2;
	sequence: number[][];
	

	constructor(initialSequence: number[][] = [[]]) {
		this.state = 0;
		this.sequence = initialSequence;
		this._sequenceTaskRunner = sequencer();
		this._oldChord = [];
		sequence = initialSequence;

	}

	next = (main: Main): void => {

		if (this.state >= this._steps) {
			let chord = this._sequenceTaskRunner.next(main.active);
			this._oldChord.forEach(
				v => main.simpleUnset(v)
			);
			chord.forEach(
				v => main.simpleSet(v)
			);
			this._oldChord = chord;
			this.state = 0;
		}
		this.state++;

	}

	setSequence = (seq: number[][]): void => {
		this.sequence = seq;
		sequence = seq;
		endIndex = sequence.length;
	}

	restart = (): void => {
		arpIndex = 0;
	}
}