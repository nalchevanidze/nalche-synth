export default function SafeWaveValue(value: number) {

	return Math.min(
		Math.max(
			Number.isNaN(value) ? 0 : value, -1
		),
		1
	);

}