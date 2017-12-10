import setNote, { Note, DeepMidi, FlatMidi, MidiTask } from "./setNote";
export { MidiTask } from "./setNote";

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

	return midi;
}