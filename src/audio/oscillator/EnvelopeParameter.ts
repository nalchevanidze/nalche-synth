import context from "../Context";
let { sampleRate } = context;

export default function* EnvelopeParameter(
	SampleLifeTime: number = 0.5,
	startValue: number = 1,
	endValue: number = 0

): IterableIterator<number> {

	if (SampleLifeTime === 0) {
		return endValue;
	}

	let curve: number = 1;
	let left: number = 0;
	let difference: number = endValue - startValue;
	SampleLifeTime = SampleLifeTime * sampleRate;

	//main loop
	while (++left < SampleLifeTime) {

		// Level Modyfied by Curve
		let level = (left / SampleLifeTime) ** curve;

		yield startValue + difference * level;
	}

	return endValue;
}