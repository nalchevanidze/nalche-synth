import countdownIterator from "./countdownIterator";
import { envelopeStates as State} from "./envelopeTypes";
export interface EnvelopeConfig {
	attack: number;
	decay: number;
	release: number;
	sustain: number;
}

export default class Envelope {

	getValue: IterableIterator<number>;
	live: boolean;
	volume: number;
	private state: State;
	private env: EnvelopeConfig;

	constructor(env: EnvelopeConfig) {
		this.env = env;
		this.live = false;
		this.volume = 0;
		this.restart = this.restart.bind(this);
		this.next = this.next.bind(this);
		this.end = this.end.bind(this);
		this.updateStep = this.updateStep.bind(this);
		this.state = State.ATTACK;
	}
	updateStep(
		{ done, value }: {
			done: boolean,
			value: number
		}
	): number {
		this.volume = value;
		if (done) {
			if (this.state == State.ATTACK) {
				this.getValue = countdownIterator(
					this.env.decay ,
					this.volume,
					this.env.sustain
				);
			}
			this.state++;
		}
		return this.volume;
	}
	next(): number {
		// if Inactive
		if (!this.live) {
			return 0;
		}
		switch (this.state) {
			case State.ATTACK:
			case State.DEACY:
				this.updateStep(this.getValue.next());
			case State.SUSTAIN:
				return this.volume;
			default:
				let release = this.getValue.next();
				this.live = !release.done;
				return release.value;
		}
	}

	restart(): void {
		this.live = true;
		this.state = State.ATTACK;
		this.volume = 1;
		this.getValue = countdownIterator(this.env.attack , 0, 1);
	}

	end(): void {
		this.getValue = countdownIterator(this.env.release , this.volume, 0);
		this.state = State.RELEASE;
	}

}

