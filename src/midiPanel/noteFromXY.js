import noteDetector from "./noteDetector";

export default function noteFromXY({ x, y }) {
	// findNote Name
	let noteIndex = Math.floor((360 - y) / 10);
	let id = noteDetector.idByIndex(noteIndex);
	// Note
	let position = Math.floor(x / 5);
	let index = Math.floor(position / 8);
	let at = (at % 8);

	return {
		startedAt: x,
		index,
		note: {
			at,
			length: 1,
			i: noteIndex,
			id,
			index,
			position
		}
	};
}