import Sequencer from "../../sequencer";
import Tempo from "./Tempo";
import TaskQueue from "./TaskQueue";
import Oscillator from "../index";

export default class Time extends TaskQueue {

	sequencer: Sequencer;
	private tempo: Tempo;

	constructor(main: Oscillator) {
		super(main);
		this.sequencer = new Sequencer();
		this.tempo = new Tempo();
	}

	private runSequencer(): void {
		if (this.main.seq.on) {
			this.sequencer.next(this.main);
		}
	}

	next = (): void => {
		if (this.tempo.next()) {

			if (this.main.isPlayng) {
				this.nextTask();
			}

			this.runSequencer();
		}
	}
}