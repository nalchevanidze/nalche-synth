import Context from "../Context";
import createMelodySet, {
	MidiTask
} from "../midi/createMelodySet";
import melody from "../../standartMidi";
import Sequencer from "../sequencer";

const {
	sampleRate
} = Context;

let bpm = 130;
let qartel = 1 / (60 * sampleRate / (bpm * 8));
let counter: number = 0;
let index: number = 0;
let midi = createMelodySet(melody);
let endIndex: number = 128 || midi.length;


function PlayTask(task: MidiTask, main) {

	task.start.forEach(
		e => main.setNote(e)
	);

	task.end.forEach(
		e => main.unsetNote(e)
	);
	
}

function PlayMidi(main) {

	//return at start position at the end
	if (index >= endIndex) {
		index = 0;
	}

	if (midi[index]) {
		PlayTask(midi[index], main);
	}

	index++;

	const update = () => {
		main.update(
			index,
			main.active
		);
	};
	requestAnimationFrame(update);

}

const sequencer = new Sequencer();

function next(main) {

	counter += qartel;
	if (counter > 1) {
		if (!main.isPlayng) {
			if (main.seq.on) {
				sequencer.next(main);
			}
		} else {
			PlayMidi(main);
			if (main.seq.on) {
				sequencer.next(main);
			}
		}
		counter = 0;
	}

}

export default {
	sequencer,
	next,
	setMidi(melody) {
		if (melody.length) {
			midi = createMelodySet(melody);
		}
	},
	setTime(time) {
		index = time;
	}
};