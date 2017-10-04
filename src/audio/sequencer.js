const sequence = [
	[1], [2], [3], [], [], [],
	[1, 2, 3], [], [],
	[1, 2, 3], [], [],
	[1, 2, 3], [],
	[1, 2, 3], []
];

function sequencer() {
	let arpIndex = 0;
	let endIndex = sequence.length;
	return {
		next(notes) {
			let chord = [];
			let maxNotes = notes.size;
			let values = Array.from(notes);
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
let state = 0;
export default function sequnecing(main) {
	state++;
	if (state >= steps) {
		let chord = seq.next(main.active);
		oldChord.forEach(
			(v) => main.simpleUnset(v)
		);
		chord.forEach(
			(v) => main.simpleSet(v)
		);
		oldChord = chord;
		state = 0;
	}
}