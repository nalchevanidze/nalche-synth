import noteDetector from "./noteDetector";

export default function noteFromXY({ x, y }) {
	// findNote Name
	let noteIndex = Math.floor((360 - y) / 10);
	let id = noteDetector.idByIndex(noteIndex);
	// Note
	let at = Math.floor(x / 5);
	let index = Math.floor(at / 8);

	at = (at % 8);

	return {
		startedAt: x,
		index,
		note: {
			at,
			length: 1,
			id,
			index
		}
	};
}