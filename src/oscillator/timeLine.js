import Context from "../Context";
const { sampleRate } = Context;
let bpm = 130;
let qartel = 1 / (60 * sampleRate / (bpm * 8));

let counter = 0;
let index = 0;

import createMelodySet from "../midi/createMelodySet";
import melody from "../standartMidi";

let midi = createMelodySet(melody);
let endIndex = 128 || midi.length;

function PlayTask(task, main) {

	task.start.forEach(
		e =>
			main.setNote(e + 12)


	);
	task.end.forEach(
		e =>
			main.unsetNote(e + 12)

	);

}

function next(main) {

	if (!main.isPlayng) {
		return null;
	}
	counter += qartel;
	if (counter > 1) {

		if (index >= endIndex) {
			index = 0;
		}

		if (midi[index]) {
			PlayTask(midi[index], main);
		}

		index++;
		counter = 0;
		const update = () => {
			main.update(
				index,
				main.notes
			);
		};
		requestAnimationFrame(update);
	}

}

export default {
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

