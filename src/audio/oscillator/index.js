import Context from "../Context";
import FillAudioChenel from "./FillAudioChenel";
const { destination } = Context;
import SoundEvent from "./SoundEvent";
const bufferSize = 2048; //4096;
import timeLine from "./timeLine";
import Controller from "../../Controller";

export default function Oscillator(target) {


	const notes = {};
	let active = new Set([]);

	const oscList = Array.from(
		{ length: 6 },
		() => SoundEvent(Controller)
	);

	function simpleSet(value) {
		if (!notes[value]) {
			let current = oscList.filter(
				osc => !osc.eventTimes.live
			)[0];
			if (!current) {
				current = SoundEvent(Controller);
				oscList.push(current);
			}
			notes[value] = current;
			current.setNote(value);
		}
	}

	function simpleUnset(value) {
		if (notes[value]) {
			notes[value].end();
			notes[value] = null;
		}
	}


	const event = {
		dead: true,
		notes,
		active,
		update: target,
		simpleSet,
		simpleUnset,
		unsetNote(value) {
			//simpleUnset(value);
			active.delete(value);

		},
		setNote(value) {
			//simpleSet(value);
			active.add(value);
		},
		start(param) {
			oscList.forEach(e => {
				e.setNote(param.note);
			});
		}
	};

	//main node;
	function onProcess(input) {

		let active = oscList.filter(
			e => e.eventTimes.live
		);

		let audio = input.outputBuffer.getChannelData(0);
		FillAudioChenel(audio, active, event);
	}

	const node = Context.createScriptProcessor(bufferSize, 1, 1);
	node.connect(destination);
	node.onaudioprocess = onProcess;

	function clean() {
		oscList.forEach(
			e => e.end()
		);
		active.clear();
		Object.keys(notes).forEach(i => {
			notes[i] = null;
		});
	}

	event.pause = () => {
		clean();
		event.isPlayng = false;
	};

	event.setTime = (time) => {
		clean();
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