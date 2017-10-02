import SafeWaveValue from "./SafeWaveValue";

// import Context from "../Context";
// const { sampleRate } = Context;
// let bpm = 128;
// let qartel = 60*sampleRate/(128*(3/16));
// console.log(qartel);
// 60 * 1000 / (this.BPM * 8)
// let counter = 0;
// const bufferSize = 2048;

export default function FillAudioChenel(out, sound, osclist) {

	let i, { length } = out;

	let n, oscCount = osclist.length;

	//console.log(osclist);

	for (i = 0; i < length; ++i) {

		let value = 0;

		for (n = 0; n < oscCount; ++n) {
			value += osclist[n].next();
		}

		sound.next();
		
		// counter++;

		// if ( counter % sampleRate === 0) {
		// 	Sound.setNote(24);
		// 	Sound.end();
		// 	console.log(i);
		// }

		out[i] = SafeWaveValue(value);

	}

}