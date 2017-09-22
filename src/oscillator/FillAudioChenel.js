import SafeWaveValue from "./SafeWaveValue";
export default function FillAudioChenel(out, Sound) {
	let i, { length } = out;
	for (i = 0; i < length; ++i) {
		out[i] = SafeWaveValue(Sound.next());
	}
}