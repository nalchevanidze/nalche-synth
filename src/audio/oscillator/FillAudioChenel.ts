import SafeWaveValue from "./SafeWaveValue";
import timeLine from "./timeLine";
import {
	SoundEventInstance
} from "./SoundEvent";


export default function FillAudioChenel(
	out: Float32Array,
	osclist: SoundEventInstance[],
	main
) {

	let i: number, length = out.length;
	let n: number, oscCount = osclist.length;

	for (i = 0; i < length; ++i) {

		let value: number = 0;

		for (n = 0; n < oscCount; ++n) {
			value += osclist[n].next();
		}

		timeLine.next(main);

		out[i] = SafeWaveValue(value);
	}
}