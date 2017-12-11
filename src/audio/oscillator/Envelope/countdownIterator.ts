import context from "../../Context";
let { sampleRate } = context;

/**
 * genaerates Itterator on mehtod next generates depending of start and endvalue 
 * increasing or decreasing itteration,
 * @param SampleLifeTime - life time of count time in seconds
 * @param startValue - 	value that will be at start ,
 * 						if it is greater as endvalue will be decrising
 * 						itteration
 * @param endValue - ending value of itteration after that will give itterator done
 */
export default function* countdownIterator(
	SampleLifeTime: number = 0.5,
	startValue: number = 1,
	endValue: number = 0

): IterableIterator<number> {

	if (SampleLifeTime === 0) {
		return endValue;
	}

	let curve: number = 2;
	let left: number = 0;
	let difference: number = endValue - startValue;
	SampleLifeTime = SampleLifeTime * context.sampleRate;

	//main loop
	while (++left < SampleLifeTime) {

		// Level Modyfied by Curve
		let level = (left / SampleLifeTime) ** curve;

		yield startValue + difference * level;
	}

	return endValue;
}