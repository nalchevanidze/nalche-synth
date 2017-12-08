import context from "../Context";
let { sampleRate } = context;

export default function* EnvelopeParameter(
	SampleLifeTime: number = 0.5,
	start_value: number = 1,
	end_value:number = 0

):number {

	if (SampleLifeTime === 0) {
		return end_value;
	}

	let difference = end_value - start_value;

	let curve = 1;

	SampleLifeTime = SampleLifeTime * sampleRate;


	let left = 0;

	while (++left < SampleLifeTime) {

		// Level Modyfied by Curve
		let level = (left / SampleLifeTime) ** curve;

		yield start_value + difference * level;
	}


	return end_value;

}