export interface Note {
	id: string;
	length: number;
	at: number;
}

export interface MidiTask {
	start: number[],
	end: number[]
}

export type DeepMidi = Note[][];
export type FlatMidi = MidiTask[];