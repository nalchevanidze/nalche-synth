const sequence = [
	[1], [2], [3], [], [], [],
	[1, 2, 3], [], [],
	[1, 2, 3], [], [],
	[1, 2, 3], [],
	[1, 2, 3], []
];

export default function sequencer() {

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