import Context from "../Context";
const {
	sampleRate
} = Context;

function Rescale(value: number, deep: number) {
	deep = 2 / (deep ** 2);
	return (value + deep) / deep;
}

export default class WaveLooper {

	private freq: number;
	private state: number;
	private stepSize: number;
	private FM: {
		state: number;
		level: number;
		freq: number;
		stepSize: number;
	}

	constructor() {
		this.freq = 0;
		this.next = this.next.bind(this);
		this.state = 0;
		this.stepSize = 0.1;
		this.FM = {
			state: 0,
			level: 0,
			freq: 0.25,
			stepSize: 0.1
		};
	}

	set(freq: number = 440, FMLevel: number = 1, FMFreq: number) {


		this.FM.freq = (FMFreq !== undefined) ?
			FMFreq * 4 : this.FM.freq;

		if (this.FM.freq === 0) {
			this.FM.freq = 1 / 16;
		}

		this.freq = freq;
		this.state = 0;
		//unision
		this.state = Math.random();

		//this
		this.stepSize = freq / sampleRate;
		this.FM.stepSize = this.stepSize * this.FM.freq;
		this.FM.state = 0;
		this.FM.level = FMLevel;
	}

	next() {

		let {
			state,
			stepSize,
			FM
		} = this;

		// generate new wavePosition
		state += stepSize;
		this.state = state % 1;

		// new Fm Position
		if (FM.level === 0) {
			return state;
		}
		FM.state = FM.state + FM.stepSize;
		const FMWaveFormPosition = Math.sin(FM.state);

		return this.state * Rescale(FMWaveFormPosition, FM.level);

	}
}