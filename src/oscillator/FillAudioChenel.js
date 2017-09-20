import SafeWaveValue from "./SafeWaveValue";


const smoothing = 30;

export default function FillAudioChenel(out, Sound) {

	let i, { length } = out;

	for (i = 0; i < length; ++i) {
		out[i] = SafeWaveValue(Sound.next());
	}

}