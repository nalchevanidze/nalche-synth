import context from "../Context";
let { sampleRate } = context;

export default function* EnvelopeParameter(
	SampleLifeTime: number = 0.5,
	startValue: number = 1,
	endValue: number = 0

){

	if (SampleLifeTime === 0) {
		return endValue;
	}

	let curve = 1;
	let left = 0;
	let difference = endValue - startValue;
	SampleLifeTime = SampleLifeTime * sampleRate;

	//main loop
	while (++left < SampleLifeTime) {

		// Level Modyfied by Curve
		let level = (left / SampleLifeTime) ** curve;

		yield startValue + difference * level;
	}

	return endValue;
}