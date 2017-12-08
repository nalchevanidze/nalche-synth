import SafeWaveValue from "./SafeWaveValue";
import timeLine from "./timeLine";

export default function FillAudioChenel(
	out: Float32Array,
	osclist,
	main
) {

	let i: number, length = out.length;
	let n: number, oscCount = osclist.length;
	//console.log(osclist);

	for (i = 0; i < length; ++i) {
		let value = 0;

		for (n = 0; n < oscCount; ++n) {
			value += osclist[n].next();
		}


		timeLine.next(main);


		out[i] = SafeWaveValue(value);
	}
}