import SafeWaveValue from "./SafeWaveValue";
import timeLine from "./timeLine";

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