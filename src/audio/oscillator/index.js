import Context from "../Context";
import FillAudioChenel from "./FillAudioChenel";
const { destination } = Context;
const bufferSize = 2048; //4096;
import timeLine from "./timeLine";
import Controller from "../../Controller";
import oscManager from "./oscManager";

export default function Oscillator(target) {


	const notes = {};
	const active = new Set([]);
	//const noteList = new Map([]);

	const osc = oscManager(Controller);

	function simpleSet(value) {
		if (!notes[value]) {
			notes[value] = osc.getOsc();
			notes[value].setNote(value);
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
		simpleUnset
	};

	event.setNote = note => {
		if (event.isPlayng) {
			simpleSet(note);
		}
		active.add(note);
	};

	event.unsetNote = note => {
		if (event.isPlayng) {
			simpleUnset(note);
		}
		active.delete(note);
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
	//event.setTime = timeLine.setTime;

	event.play = () => {
		event.isPlayng = true;
	};

	return event;
}