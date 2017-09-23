const parameters = { 
	
	wave: {
		 sine: 0 , 
		 square: 0.25 , 
		 saw: 0 , 
		 saw2: 0.25,
		 tech: 0.75 ,
		 noise: 0,
		 fm: 0.25,
		 fmFreq: 0
	},
	
	envelope:{
		release: 0.3,
		attack: 0,
		sustain: 0.3,
		decay: 0.2
	},

	filter:{
		cutoff: 0.14,
		resonance: 0.25
	},

	pitch: 1
	
}
export default parameters;