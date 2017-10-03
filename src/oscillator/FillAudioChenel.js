import SafeWaveValue from "./SafeWaveValue";
import timeLine from "./timeLine";
const sequence = timeLine.next;

export default function FillAudioChenel(out, osclist, main) {

	let i, { length } = out;
	let n, oscCount = osclist.length;
	//console.log(osclist);

	for (i = 0; i < length; ++i) {
		let value = 0;

		for (n = 0; n < oscCount; ++n) {
			value += osclist[n].next();
		}

		sequence(main);

		out[i] = SafeWaveValue(value);
	}
}