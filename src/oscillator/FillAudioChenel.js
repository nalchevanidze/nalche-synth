import SafeWaveValue from "./SafeWaveValue";

import Context from "../Context";
const { sampleRate } = Context;
let bpm = 130;
let qartel = 1 / (60 * sampleRate / (bpm * 8));

let counter = 0;
let index = 0;

import createMelodySet from "../midi/createMelodySet";
import melody from "../standartMidi";

let myMidi = createMelodySet(melody);
const midi = myMidi;
let endIndex = 128 || midi.length;

function timeLine(main) {
	if (main.dead) {
		return null;
	}
	counter += qartel;
	if (counter > 1) {
		if (index >= endIndex) {
			index = 0;
		}
		if (midi[index]) {
			midi[index].start.forEach(
				e => 
					main.newNote(e + 12)

				
			);
			midi[index].end.forEach(
				e => 
					main.endNote(e + 12)
				
			);
		}
		index++;
		counter = 0;
	}
}


export default function FillAudioChenel(out, osclist, main) {

	let i, { length } = out;
	let n, oscCount = osclist.length;
	//console.log(osclist);

	for (i = 0; i < length; ++i) {
		let value = 0;

		for (n = 0; n < oscCount; ++n) {
			value += osclist[n].next();
		}

		timeLine(main);

		out[i] = SafeWaveValue(value);
	}
}