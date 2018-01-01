import MoogSampler from "./MoogSampler";
import Context from "../../Context";
const { sampleRate } = Context;
import { envelopeStates } from "../Envelope/envelopeTypes";
//const bufferSize = 2048;
// cutoff between 0.0 and 1.0
//resonance between 0.0 and 4.0
import { Controller } from "../../../Controller";

export default function filterBuilder({ env, filter }: Controller) {

	let maxCutoff: number = 1.16;
	let cutoff: number,
		resonance: number,
		type: number;
	let decayStep: number, attackStep: number, sustainLevel: number;
	let filterSample = MoogSampler();

	function envelope() {

		switch(type){
			case envelopeStates.ATTACK:{

				cutoff += attackStep;

				if (cutoff >= maxCutoff) {
					type = envelopeStates.DEACY;
					cutoff = maxCutoff;
				}
				break;

			}
			case envelopeStates.DEACY:{

				if (cutoff > sustainLevel) {
					cutoff -= decayStep;
				}else{
					cutoff = sustainLevel;
					type = envelopeStates.SUSTAIN;
				}
				break;
				
			}
		}

	}

	return {
		next(input: number) {
			if (!filter.on) {
				return input;
			}
			envelope();

			let frequency = filter.envelope === 0 ?
				filter.cutoff
				: Math.max(
					(maxCutoff - (maxCutoff - cutoff) * filter.envelope) ** 2,
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
			cutoff = 0.1;
			maxCutoff = filter.cutoff * 1.16;
			resonance = filter.resonance;
			type = envelopeStates.ATTACK;
			decayStep = Math.min(1, 1 / (sampleRate * decay));
			attackStep = Math.min(1, 1 / (sampleRate * attack));
			sustainLevel = Math.max(sustain * maxCutoff, 0.001);
		}
	};
}