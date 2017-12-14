import Context from "../../Context";
import createMelodySet from "../../midi/createMelodySet";
import { DeepMidi , MidiTask} from "../../types";
import melody from "../../../standartMidi";
import Oscillator from "../index";

let index: number = 0;
let midi = createMelodySet(melody);
let endIndex: number = 128 || midi.length;

export default class TaskQueue {

	main: Oscillator;
	setNote: (note: number) => void;
	unsetNote: (note: number) => void;
	update: () => void;

	constructor(main: Oscillator) {
		this.main = main;
		this.setNote = note => main.setNote(note);
		this.unsetNote = note => main.unsetNote(note);
		this.update = () => main.update(index, main.active);
	}

	runTask = ({ end, start }: MidiTask): void => {

		//add new notes
		start.forEach(this.setNote);
		
		//terminate all notes that was before
		end.forEach(this.unsetNote);
		
		
	}

	nextTask = (): void => {

		if (index >= endIndex) {
			index = 0;
		}
		if (midi[index]) {
			this.runTask(midi[index]);
		}

		index++;
		requestAnimationFrame(this.update);

	}

	setMidi(melody: DeepMidi): void {
		if (melody.length) {
			midi = createMelodySet(melody);
		}
		endIndex = midi.length;
	}

	setTime(time: number) {
		index = time;
	}
}

