

export interface WavePatameters {
	sine: number,
	square: number,
	saw: number,
	saw2: number,
	tech: number,
	noise: number,
	fm: number,
	fmFreq: number,
	offset: number,
	voices: number,
	pitch: number
}


export interface EnvelopeState {
	attack: number,
	decay: number,
	sustain: number,
	release: number
}

export interface FilterParameters {
	cutoff: number;
	resonance: number;
	envelope: number;
	on: boolean;
}
export interface EnvelopeStates {
	filter: EnvelopeState;
	gain: EnvelopeState
}
export interface Controller {
	wave: WavePatameters;
	seq: {
		on: boolean;
	},
	env: EnvelopeStates
	filter: FilterParameters;
}

const parameters: Controller = {
	wave: {
		sine: 0,
		square: 0.5,
		saw: 1,
		saw2: 1,
		tech: 1,
		noise: 0.5,
		fm: 0.25,
		fmFreq: 0,
		offset: 0.625,
		voices: 1,
		pitch: 0.625
	},
	seq: {
		on: false
	},
	env: {
		filter: {
			attack: 0,
			decay: 0.21,
			sustain: 0.08,
			release: 0.1
		},
		gain: {
			attack: 0,
			decay: 0.27,
			sustain: 0.5,
			release: 0.3
		}
	},
	filter: {
		cutoff: 1,
		resonance: 0.25,
		envelope: 0,
		on: false
	}
};
export default parameters;