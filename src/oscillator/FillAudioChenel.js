import SafeWaveValue from "./SafeWaveValue";

import Context from "../Context";
const { sampleRate } = Context;
let bpm = 128;
let qartel = Math.floor(60 * sampleRate / (128 *4)) ;
let counter = 0;
const midi = [
	[4, 10, 2],
	[],
	[4, 10, 2],
	[]
];

export default function FillAudioChenel(out, sound, osclist) {

	let i, { length } = out;
	let n, oscCount = osclist.length;
	//console.log(osclist);
	for (i = 0; i < length; ++i) {
		let value = 0;
		for (n = 0; n < oscCount; ++n) {
			value += osclist[n].next();
		}
		counter++;
		if (counter % qartel === 0) {
			[36,43,45,46].forEach(
				(e, i) => {
					osclist[i].setNote(e);
					osclist[i].end();

				}
			);
		}
		out[i] = SafeWaveValue(value);
	}
}