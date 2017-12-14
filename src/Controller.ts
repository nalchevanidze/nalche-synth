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

const defaultPreset: Controller = {
	wave: {
		sine: 0.2,
		square: 1,
		saw: 1,
		saw2: 1,
		tech: 0,
		noise: 0,
		fm: 0,
		fmFreq: 0,
		offset: 0.75,
		voices: 1,
		pitch: 0.625
	},
	seq: {
		on: true
	},
	env: {
		filter: {
			attack: 0,
			decay: 0.4,
			sustain: 0.08,
			release: 0.1
		},
		gain: {
			attack: 0,
			decay: 0.05,
			sustain: 0.5,
			release: 0.3
		}
	},
	filter: {
		cutoff: 0.35,
		resonance: 0.2,
		envelope: 0.6,
		on: false
	}
};

const pluck : Controller = {
	wave: {
		sine: 1,
		square: 0,
		saw: 0,
		saw2: 0.125,
		tech: 0,
		noise: 0,
		fm: 0,
		fmFreq: 0,
		offset: 0,
		voices: 0,
		pitch: 0.5
	},
	seq: {
		on: true
	},
	env: {
		filter: {
			attack: 0,
			decay: 0.4,
			sustain: 0.08,
			release: 0.1
		},
		gain: {
			attack: 0,
			decay: 0.2,
			sustain: 0.3,
			release: 0.3
		}
	},
	filter: {
		cutoff: 0.5,
		resonance: 0.2,
		envelope: 0.6,
		on: true
	}
};

const Razor : Controller = {
	wave: {
		sine: 1,
		square: 0,
		saw: 0,
		saw2: 0.125,
		tech: 1,
		noise: 0,
		fm: 0.7,
		fmFreq: 0.53125,
		offset: 0,
		voices: 0.18181818181818182,
		pitch: 0.5
	},
	seq: {
		on: false
	},
	env: {
		filter: {
			attack: 0,
			decay: 0.4,
			sustain: 0.08,
			release: 0.1
		},
		gain: {
			attack: 0,
			decay: 0.2,
			sustain: 1,
			release: 0.3
		}
	},
	filter: {
		cutoff: 0.5,
		resonance: 0.2,
		envelope: 0.6,
		on: false
	}
}

const Padd : Controller = {
	wave: {
		sine: 1,
		square: 0.1,
		saw: 0.4,
		saw2: 0.125,
		tech: 0,
		noise: 0,
		fm: 0,
		fmFreq: 0,
		offset: 0.5,
		voices: 0,
		pitch: 0.625
	},
	seq: {
		on: false
	},
	env: {
		filter: {
			attack: 0.7,
			decay: 0.7,
			sustain: 0.08,
			release: 0.1
		},
		gain: {
			attack: 0.2,
			decay: 0.2,
			sustain: 1,
			release: 0.3
		}
	},
	filter: {
		cutoff: 0.5,
		resonance: 0.2,
		envelope: 0.6,
		on: true
	}
}

const presets = {
	default:defaultPreset,
	pluck:pluck,
	razor:Razor,
	padd:Padd
}


export default presets;