const keys = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export default function keysToIndexes(note) {
	const indexPosition = note.length - 1;
	let noteNumber = Number(note.charAt(indexPosition));
	note = note.slice(0, indexPosition);
	const index = keys.indexOf(note.toUpperCase()) + (noteNumber * 12);
	if (index === -1) {
		throw new Error("invalid Note");
	}
	return index;
}
