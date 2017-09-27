const parameters = {
	wave: {
		sine: 0,
		square: 0.5,
		saw: 1,
		saw2: 1,
		tech: 1,
		noise: 0.25,
		fm: 0.0,
		fmFreq: 0,
		offset: 0.9,
		voices: 1
	},
	envelope: {
		attack: 0,
		decay: 0.27,
		sustain: 0.15,
		release: 0.3
	},
	env: {
		filter: {
			attack: 0,
			decay: 0.21,
			sustain: 0.08,
			release: 0.1
		},
	},
	filter: {
		cutoff: 1,
		resonance: 0.25,
		envelope: 0.25
	}
}
export default parameters;