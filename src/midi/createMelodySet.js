import setNote from "./setNote";

export default function createMelodySet(rowArray) {
	let midi = [];
	rowArray.forEach(
		(quarter, i) => {
			if (quarter) {
				quarter.forEach((note) => {
					setNote(midi, i * 8, note);
				})
			}
		}
	)
	return midi;
};