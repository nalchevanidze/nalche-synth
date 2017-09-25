const parameters = {

	wave: {
		sine: 0,
		square: 0.25,
		saw: 0,
		saw2: 0.25,
		tech: 0.75,
		noise: 0,
		fm: 0.25,
		fmFreq: 0,
		offset: 0.5,
		voices: 1
	},

	envelope: {
		release: 0.34,
		attack: 0,
		sustain: 0.5,
		decay: 0.3
	},

	env: {

		filter: {
			release: 0.1,
			attack: 0,
			sustain: 0.35,
			decay: 0.4
		},

		

	},
	filter: {
		cutoff: 0.375,
		resonance: 0.15
	}
}
export default parameters;