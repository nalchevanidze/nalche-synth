import MoogSampler from "./MoogSampler";
import Context from "../../Context";
const { sampleRate } = Context;
//const bufferSize = 2048;
// cutoff between 0.0 and 1.0
//resonance between 0.0 and 4.0

const ATTACK = 0;
const DEACY = 1;

import {
	Controller
} from "../../../Controller";

export default function filterBuilder({ env, filter }: Controller) {

	let maxCutoff = 1.16;
	let f, resonance, type;
	let decayStep, attackStep, threshhold;
	let filterSample = MoogSampler();

	function envelope() {
		if (type === ATTACK) {
			f += attackStep;
			if (f >= maxCutoff) {
				type = DEACY;
				f = maxCutoff;
			}
		} else if (f > threshhold) {
			f -= decayStep;
		}
	}

	return {
		next(input) {
			if (!filter.on) {
				return input;
			}
			envelope();

			let frequency = filter.envelope === 0 ?
				filter.cutoff
				: Math.max(
					(maxCutoff - (maxCutoff - f) * filter.envelope) ** 2,
					0.02
				);


			return filterSample(
				input,
				frequency,
				resonance
			);
		},
		set() {
			let { decay, sustain, attack } = env.filter;
			f = 0.1;
			maxCutoff = filter.cutoff * 1.16;
			resonance = filter.resonance;
			type = ATTACK;
			decayStep = Math.min(1, 1 / (sampleRate * decay));
			attackStep = Math.min(1, 1 / (sampleRate * attack));
			threshhold = Math.max(sustain * maxCutoff, 0.001);
		}
	};
}