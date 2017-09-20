const parameters = { 
	
	wave: {
		 sine: 0 , 
		 square: 0 , 
		 saw: 0 , 
		 saw2: 0,
		 tech: 0.5 ,
		 noise: 0,
		 fm: 0.5,
		 fmFreq: 0
	},
	
	envelope:{
		release: 0.3,
		attack: 0,
		sustain: 0.3,
		decay: 0.3
	},

	filter:{
		cutoff: 0.5,
		resonance: 0.5
	}
	
}
export default parameters;