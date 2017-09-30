import Controller from "../Controller";
import WaveForm from "./WaveForm";
import EventTimes from "./EventTimes";
import WaveLooper from "./WaveLooper";

const { wave } = Controller;

export default function SoundEvent() {
	const maxVoices = 8;
	const maxOffset = 2;
	const positions = Array.from(
		{ length: maxVoices },
		() => new WaveLooper()
	);

	const eventTimes = new EventTimes();
	let count = 0;
	function multyVoices() {
		let value = 0;
		for (let i = 0; i <= count; i++) {
			value += WaveForm(positions[i].next(), wave);
		}
		return value / (count + 1);
	}
	function reset(frequency) {

		count = wave.voices * (maxVoices - 1);
		let middle = Math.floor((count + 1) / 2);

		for (let i = 0; i <= count; i++) {
			let value = i - middle;
			let diff = value * wave.offset * maxOffset;
			positions[i].set(
				frequency + diff,
				wave.fm,
				wave.fmFreq
			);
		}
		eventTimes.restart();
	}

	const next = () =>
		eventTimes.next() * multyVoices();

	return { 
		eventTimes, 
		next, 
		reset, 
		end: eventTimes.end.bind(eventTimes)
	};
}