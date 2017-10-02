import Controller from "../Controller";
const { filter } = Controller;
// cutoff between 0.0 and 1.0
//resonance between 0.0 and 4.0
import MoogSampler from "./MoogSampler";
const bufferSize = 2048;

export default function filterBuilder() {
	let maxCutoff = 1.16;
	let f, res, type;
	let decayStep, attackStep, threshhold;
	let filterSample = MoogSampler();

	function envelope() {

		if (type === "attack") {
			f += attackStep;
			if (f >= maxCutoff) {
				type = "decay";
				f = maxCutoff;
			}
		} else if (f > threshhold) {
			f -= decayStep;
		}

	}


	function next(input) {

		if (filter.envelope === 0) {
			return input;
		}
		
		envelope();
		let ff = Math.max(
			(maxCutoff - (maxCutoff - f) * filter.envelope) ** 2,
			0.02
		);

		return filterSample(
			input,
			ff,
			res
		);
	}
	return {
		next,
		set() {
			let { decay, sustain, attack } = Controller.env.filter;
			f = 0.1;
			maxCutoff = filter.cutoff * 1.16;
			res = filter.resonance;
			type = "attack";
			decayStep = Math.min(1, 1 / (bufferSize * 20 * decay));
			attackStep = Math.min(1, 1 / (bufferSize * 40 * attack));
			threshhold = Math.max(sustain * maxCutoff, 0.001);
		}
	};
}