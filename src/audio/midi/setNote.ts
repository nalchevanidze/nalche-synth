import keysToIndexes from "../../keysToIndexes";

export interface Note {
	id: string;
	length: number;
	at: number;
}

export interface MidiPoint {
	start: number[],
	end: number[]
}

export type DeepMidi = Note[][];
export type FlatMidi = MidiPoint[];




function setValue(
	midi: FlatMidi,
	i: number,
	type: "start" | "end",
	value: string
) {

	if (!midi[i]) {
		midi[i] = {
			start: [],
			end: []
		};
	}
	midi[i][type].push(keysToIndexes(value));

}

export default function setNote(midi: FlatMidi, startIndex: number, note: Note): void {

	let start: number = startIndex + note.at;
	let end: number = start + note.length;

	setValue(midi, start, "start", note.id);
	setValue(midi, end, "end", note.id);

}