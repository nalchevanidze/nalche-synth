const sequence = [
	[1], [2], [3], [4], [], [],
	[1, 2, 3, 4], [], [],
	[1, 2, 3, 4], [], [],
	[1, 2, 3, 4], [],
	[1, 2, 3, 4], []
];

export default function sequencer(midi, c, start, end) {
	start *= 32;
	end = start + end * 32;
	let i = start;
	let arpIndex = 0;
	while (i <= end) {
		// makes saquence loop
		if (arpIndex >= sequence.length) {
			arpIndex = 0;
		}
		let currentChord = sequence[arpIndex];
		if (currentChord.length > 0) {
			const chord = currentChord.map((noteIndex) => {
				noteIndex--;
				const outIndex = Math.floor(noteIndex / c.length);
				noteIndex = noteIndex % c.length;
				return c[noteIndex] + (12 * outIndex);
			});
			midi[i] = {
				start: chord,
				end: []
			};
			midi[i + 1] = {
				start: [],
				end: chord
			};
		}
		arpIndex++;
		i += 2;
	}

}