const keys: string[] = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export default function keysToIndexes(note: string): number {

	const indexPosition = note.length - 1;
	const octaveIndex = Number(note.charAt(indexPosition));
	note = note.slice(0, indexPosition);
	const keyindex = keys.indexOf(note.toUpperCase());
	if (keyindex === -1) {
		throw new Error("invalid Note");
	}
	return (keyindex + octaveIndex * 12);

}
