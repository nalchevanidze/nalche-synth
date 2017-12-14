import setNote from "./setNote";
import { Note, DeepMidi, FlatMidi, MidiTask } from "../types";

export default function createMelodySet(rowArray: DeepMidi): MidiTask[] {
	let midi: FlatMidi = [];

	rowArray.forEach(

		(quarter, i: number) => {

			if (quarter) {
				quarter.forEach((note: Note) => {
					setNote(midi, i * 8, note);
				});
			}

		}

	);

	console.log(midi);

	return midi;
}