import Context from "../Context";
import FillAudioChenel from "./FillAudioChenel";
const { destination } = Context;
const bufferSize = 2048; //4096;
import timeLine from "./timeLine";
import oscManager from "./oscManager";


export default function Oscillator(Controller, target) {


	const notes = {};
	const active = new Set([]);

	//const noteList = new Map([]);

	const osc = oscManager(Controller);
	function simpleSet(note) {
		if (!notes[note]) {
			notes[note] = osc.getOsc(note);
		}
	}
	function simpleUnset(value) {
		if (notes[value]) {
			notes[value].end();
			notes[value] = null;
		}
	}
	const event = {
		isPlayng: false,
		notes,
		active,
		update: target,
		simpleSet,
		simpleUnset,
		setSequence: timeLine.sequencer.setSequence
	};
	event.setNote = note => {

		if (!active.has(note)) {
			timeLine.sequencer.restart();
		}

		active.add(note);
		if (event.isPlayng) {
		//	simpleSet(note);
		}else{
			target(0,active);
		}
	};
	event.unsetNote = note => {
		active.delete(note);
		if (event.isPlayng) {
		//	simpleUnset(note);
		}else{
			target(0,active);
		}
	};
	//main node;
	function onProcess(input) {
		let audio = input.outputBuffer.getChannelData(0);
		FillAudioChenel(
			audio,
			osc.active(),
			event
		);
	}
	const node = Context.createScriptProcessor(bufferSize, 1, 1);
	node.connect(destination);
	node.onaudioprocess = onProcess;
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