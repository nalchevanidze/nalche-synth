import Context from "../Context";
import FillAudioChenel from "./FillAudioChenel";
const {
	destination
} = Context;
const bufferSize = 2048; //4096;
import timeLine from "./timeLine";
import oscManager from "./oscManager";


// class SoundEvent {

// 	isPlayng: boolean,
// 	notes: {},
// 	active: Set < number > ,

// }


export default function Oscillator(Controller, target) {

	const notes = {};
	const active: Set < number > = new Set([]);
	const osc = oscManager(Controller);

	function simpleSet(note): void {
		if (!notes[note]) {
			notes[note] = osc.getOsc(note);
		}
	}

	function simpleUnset(value) :void {
		if (notes[value]) {
			notes[value].end();
			notes[value] = null;
		}
	}

	const event = {
		isPlayng: false,
		notes,
		active,
		seq: Controller.seq,
		update: target,
		simpleSet,
		simpleUnset,
		setSequence: timeLine.sequencer.setSequence,
	};

	event.setNote = note => {
		if (!active.has(note)) {
			timeLine.sequencer.restart();
		}
		active.add(note);
		if (!event.seq.on) {
			simpleSet(note);
		}
		target(0, active);
	};

	event.unsetNote = note => {
		active.delete(note);
		if (!event.seq.on) {
			simpleUnset(note);
		}
		target(0, active);

	};

	const node = Context.createScriptProcessor(bufferSize, 1, 1);
	node.connect(destination);
	node.onaudioprocess = function onProcess(input: Float32Array): void {
		FillAudioChenel(
			input.outputBuffer.getChannelData(0),
			osc.active(),
			event
		);
	};

	function clear() {
		osc.clear();
		active.clear();
		Object.keys(notes).forEach(i => {
			notes[i] = null;
		});
	}
	event.pause = () => {
		clear();
		event.isPlayng = false;
	};
	event.setTime = (time) => {
		clear();
		timeLine.setTime(time);
		target(time);
	};
	//Main Functions
	event.stop = () => {
		event.pause();
		timeLine.setTime(0);
	};
	event.setMidi = timeLine.setMidi;

	event.play = () => {
		event.isPlayng = true;
	};

	return event;
}