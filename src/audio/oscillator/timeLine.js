import Context from "../Context";
const { sampleRate } = Context;
let bpm = 130;
let qartel = 1 / (60 * sampleRate / (bpm * 8));

let counter = 0;
let index = 0;

import createMelodySet from "../midi/createMelodySet";
import melody from "../../standartMidi";

let midi = createMelodySet(melody);
let endIndex = 128 || midi.length;


function PlayTask(task, main) {

	task.start.forEach(
		e => {
			main.setNote(e);

		}
	);
	task.end.forEach(
		e => {
			main.unsetNote(e);
		}

	);

}


import Sequencer from "../sequencer";


function PlayMidi(main) {

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
			sequencer.next(main);
		} else {
			PlayMidi(main);
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

