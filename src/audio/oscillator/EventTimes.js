import EnvelopeParameter from "./EnvelopeParameter";

export default class EventTimes {
	constructor(env) {
		this.env = env;
		this.atack = null;
		this.release = null;
		this.live = false;
		this.sustain = 0;
		this.active = false;
		this.volume = 0;
		this.restart = this.restart.bind(this);
		this.next = this.next.bind(this);
		this.end = this.end.bind(this);
		this.StepUpdate = this.StepUpdate.bind(this);
		this.state = null;
	}
	StepUpdate({ done, value }, NextState) {
		this.volume = value;
		if (done) {
			this.state = NextState;
		}
		return this.volume;
	}
	next() {
		// if Inactive
		if (!this.live) {
			return 0;
		}
		//  Pressed 
		if (this.active) {
			if (this.state === null) {
				this.attack = this.attack || EnvelopeParameter(this.env.attack, 0, 1);
				let attack = this.attack.next();
				return this.StepUpdate(attack, "decay");
			}
			else if (this.state === "decay") {
				this.decay = this.decay || EnvelopeParameter(this.env.decay, this.volume, this.sustain);
				let decay = this.decay.next();
				return this.StepUpdate(decay, "release");
			}
		}

		// After Press
		if (this.active) {
			return this.volume;
		}
		this.release = this.release || EnvelopeParameter(this.env.release, this.volume, 0);
		let release = this.release.next();
		this.live = !release.done;
		return release.value;
	}
	restart() {
		this.live = true;
		this.state = null;
		this.active = true;
		this.sustain = this.env.sustain;
		this.volume = 1;
		this.attack = null;
		this.release = null;
		this.decay = null;
	}
	end() {
		this.active = false;
	}
}

