import Context from "../Context";
import FillAudioChenel from "./FillAudioChenel";
const { destination } = Context;
import NoteToFrequency from "./NoteToFrequency";
import SoundEvent from "./SoundEvent";
const bufferSize = 2048; //4096;
import filterBuilder from "./filterBuilder";

export default function Oscillator() {

	const event = SoundEvent();
	const filter = filterBuilder();

	function onProcess({ outputBuffer }) {
		let audio = outputBuffer.getChannelData(0);
		if (event.eventTimes.live) {
			FillAudioChenel(audio, event, filter);
		} else {
			audio.fill(0);
		}
	}
	const node = Context.createScriptProcessor(bufferSize, 1, 1);
	node.connect(destination);
	node.onaudioprocess = onProcess;

	return {
		start(param) {
			let frequency = NoteToFrequency(param.note);
			event.reset(frequency);
			filter.set();
		},
		end() {
			event.end();
		},
		isActive() {
			return event.eventTimes.live;
		}
	};
}