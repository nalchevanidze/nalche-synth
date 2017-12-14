import Context from "../../Context";
const { sampleRate } = Context;


let counter: number = 0;
let subStep = 0;
export default class Tempo {

	BPM: number;
	set BMP(beatsPerMinute: number) {
		this.BMP = beatsPerMinute;
		subStep = 1 / (60 * sampleRate / (beatsPerMinute * 8));
	}
	constructor() {
		this.BPM = 130;
		subStep = 1 / (60 * sampleRate / (this.BPM * 8));
	}

	next(): boolean {
		counter += subStep;
		if (counter > 1) {
			//next step
			counter = 0;
			return true;
		}
		return false;
	}
}