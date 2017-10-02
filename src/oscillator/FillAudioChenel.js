import SafeWaveValue from "./SafeWaveValue";
export default function FillAudioChenel(out, Sound, filter) {
	let i, { length } = out;
	for (i = 0; i < length; ++i) {
		out[i] = filter.next(
			SafeWaveValue(Sound.next())
		);
	}
}