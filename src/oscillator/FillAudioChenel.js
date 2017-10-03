import SafeWaveValue from "./SafeWaveValue";

import Context from "../Context";
const { sampleRate } = Context;
let bpm = 120;
let qartel = 1 / (60 * sampleRate / (bpm * 8));

let counter = 0;
let index = 0;

import createMelodySet from "../midi/createMelodySet";
import melody from "../standartMidi";

let myMidi = createMelodySet(melody);
const midi = myMidi;


export default function FillAudioChenel(out, osclist, main) {

	let i, { length } = out;
	let n, oscCount = osclist.length;
	//console.log(osclist);
	for (i = 0; i < length; ++i) {
		let value = 0;

		for (n = 0; n < oscCount; ++n) {
			value += osclist[n].next();
		}

		//	value = value/4;

		counter += qartel;
		if (counter > 1) {
			if (index >= midi.length) {
				index = 0;
			}

			if (midi[index]) {

				midi[index].start.forEach(
					(e, i) => {
						main.newNote(e + 12);

					}
				);

				midi[index].end.forEach(
					(e, i) => {
						main.endNote(e + 12);
					}
				);
			}

			index++;
			counter = 0;

		}
		out[i] = SafeWaveValue(value);
	}
}