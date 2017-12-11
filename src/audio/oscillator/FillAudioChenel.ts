import SafeWaveValue from "./SafeWaveValue";
import {
	SoundEventInstance
} from "./SoundEvent";
import Time from "./Time";


export default function FillAudioChenel(
	out: Float32Array,
	osclist: SoundEventInstance[],
	timeLine: Time
) {

	let i: number, length = out.length;
	let n: number, oscCount = osclist.length;

	for (i = 0; i < length; ++i) {

		let value: number = 0;

		//generates and summs alll active notes
		for (n = 0; n < oscCount; ++n) {
			value += osclist[n].next();
		}

		//increases time index up to the next step
		timeLine.next();


		out[i] = SafeWaveValue(value);
	}
}