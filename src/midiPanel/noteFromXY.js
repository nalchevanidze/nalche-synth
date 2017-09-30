import noteDetector from "./noteDetector";

export default function noteFromXY({ x, y }) {
	// findNote Name
	let i = Math.floor(1 + (360 - y) / 10);
	let id = noteDetector.idByIndex(i);
	// Note
	let position = Math.floor(x / 5);

	return {
		length: 1,
		i,
		position
	};

}