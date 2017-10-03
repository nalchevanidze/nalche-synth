import Context from "../Context";
import FillAudioChenel from "./FillAudioChenel";
const { destination } = Context;
import SoundEvent from "./SoundEvent";
const bufferSize = 2048; //4096;

export default function Oscillator() {
	const event = SoundEvent();
	const notes = {};
	const oscList = Array.from(
		{ length: 6 },
		() => SoundEvent()
	);
	console.log(oscList);
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
	event.newNote = (value) => {
		if (!notes[value]) {

			let current = oscList.filter(
				osc => !osc.eventTimes.live
			)[0];

			if (!current) {
				current = SoundEvent();
				oscList.push(current);
			}

			notes[value] = current;
			current.setNote(value);
		}
	};
	event.endNote = (value) => {
		if (notes[value]) {
			notes[value].end();
			notes[value] = null;
		}
	};
	event.endAll = () => {
		oscList.forEach(
			e => e.end()
		);
	};

	event.start = param => {

		oscList.forEach(e => {
			e.setNote(param.note);
		});

	};

	return event;
}