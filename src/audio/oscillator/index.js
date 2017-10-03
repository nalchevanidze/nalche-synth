import Context from "../Context";
import FillAudioChenel from "./FillAudioChenel";
const { destination } = Context;
import SoundEvent from "./SoundEvent";
const bufferSize = 2048; //4096;
import timeLine from "./timeLine";
import Controller from "../../Controller";

export default function Oscillator(target) {


	const notes = {};
	const oscList = Array.from(
		{ length: 6 },
		() => SoundEvent(Controller)
	);
	const event = {
		dead: true,
		notes,
		update: target,
		unsetNote(value) {
			if (notes[value]) {
				notes[value].end();
				notes[value] = null;
			}
		},
		setNote(value) {
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