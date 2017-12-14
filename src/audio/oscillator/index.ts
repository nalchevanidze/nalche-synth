import Context from "../Context";
import FillAudioChenel from "./FillAudioChenel";
const {
	destination
} = Context;
const bufferSize = 2048; //4096;
import Time from "./Time";
import oscManager, {
	OscManagerInstance
} from "./oscManager";
import { SoundEventInstance } from "./SoundEvent";
import { Controller } from "../../Controller";
import { DeepMidi } from "../types";
export interface NotesRegister {
	[key: number]: SoundEventInstance;
}

export type Target = (time: number, activeNotes: Set<number>) => void;

export default class Oscillator {

	notes: NotesRegister;
	active: Set<number>;
	osc: OscManagerInstance;
	isPlayng: boolean = false;
	seq: { on: boolean };
	update: Target;
	timeLine: Time;
	setSequence: (seq: number[][]) => void;
	setMidi: (midi: DeepMidi) => void;

	constructor(
		controller: Controller,
		target: Target,
		sequence: number[][]
	) {
		this.notes = {};
		this.active = new Set([]);
		this.osc = oscManager(controller);
		this.seq = controller.seq;
		this.update = target;
		this.timeLine = new Time(this);
		this.setSequence = this.timeLine.sequencer.setSequence;
		this.setSequence(sequence);
		this.setMidi = this.timeLine.setMidi;

		const node = Context.createScriptProcessor(bufferSize, 1, 1);
		node.connect(destination);

		node.onaudioprocess = (input: AudioProcessingEvent): void => {
			FillAudioChenel(
				input.outputBuffer.getChannelData(0),
				this.osc.active(),
				this.timeLine
			);
		};

	}


	simpleSet = (note: number): void => {
		if (this.notes[note]) {
			this.simpleUnset(note);
		}	
		this.notes[note] = this.osc.getOsc(note);
	}

	simpleUnset = (value: number): void => {
		if (this.notes[value]) {
			this.notes[value].end();
			delete this.notes[value];
		}
	}

	unsetNote = (note: number) => {
		this.active.delete(note);
		if (!this.seq.on) {
			this.simpleUnset(note);
		}
		this.update(0, this.active);
	};

	setNote = (note: number) => {

		let { active } = this;

		if (!active.has(note)) {
			this.timeLine.sequencer.restart();
		}

		active.add(note);

		if (!this.seq.on) {
			this.simpleSet(note);
		}

		this.update(0, active);
	};
	clear = (): void => {
		this.osc.clear();
		this.active.clear();
		this.notes = {};
	}

	// main methods
	pause = (): void => {
		this.clear();
		this.isPlayng = false;
	}

	setTime = (time: number): void => {
		this.clear();
		this.timeLine.setTime(time);
		this.update(time, this.active);
	};

	stop = (): void => {
		this.pause();
		this.timeLine.setTime(0);
	};

	play = (): void => {
		this.isPlayng = true;
	};
}