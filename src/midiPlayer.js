import createMelodySet from "./midi/createMelodySet";
export default class MidiPlayer {
	constructor(osc) {
		this.endIndex = 0;
		this.osc = osc;
		this.BPM = 128;
		this.next = this.next.bind(this);
		this.currentState = 0;
		this.seq = osc.sequence;
		this.melody = osc.midi;
		this.updateMidi = this.updateMidi.bind(this);
		this.updateMidi(this.melody);
		this.setTime = this.setTime.bind(this);
		this.updateComponent = osc.component;
		this.setBPM = this.setBPM.bind(this);
	}
	setBPM(value) {
		this.BPM = value;
		this.updateComponent(this.currentState);
		clearInterval(this.loop);

	}
	setTime(value) {
		this.currentState = value;
		this.index = this.currentState;
		this.updateComponent();
	}
	updateMidi(newMelody) {
		this.midiSet = createMelodySet(newMelody);
		this.endIndex = newMelody.length * 8;
		this.endIndex= 128;
		window.localStorage.midi = JSON.stringify(newMelody);
	}
	stop() {
		this.pause();
		this.currentState = 0;
	}
	pause() {
		clearInterval(this.loop);
		this.loop = undefined;
	}
	play() {
		if (this.loop) return;
		this.index = this.currentState;
		this.loop = setInterval(this.next, 60 * 1000 / (this.BPM * 8));
	}
	executeState() {
		const { end, start } = this.state;
		const { osc } = this;
		end.forEach(osc.stop);
		start.forEach(osc.play);
	}
	next() {
		this.currentState = this.index;
		if (this.updateComponent) {
			this.updateComponent(this.currentState);
		}
		this.state = this.midiSet[this.index];
		if (this.state) {
			this.executeState();
		}

		if (this.index >= this.endIndex) {
			this.index = 0;
		} else {
			this.index++;
		}

	}
}