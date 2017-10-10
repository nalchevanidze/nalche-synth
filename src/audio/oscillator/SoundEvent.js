import WaveForm from "./WaveForm";
import EventTimes from "./EventTimes";
import WaveLooper from "./WaveLooper";
import filterBuilder from "./filterBuilder";
import NoteToFrequency from "./NoteToFrequency";

const Noise = (volume) => 1 - Math.random() * 2;
const Sine = i => Math.sin(i * Math.PI * 2);

// if (noise) {
// 	mixin += noise * Noise();
// 	i += noise;
// }

export default function SoundEvent(Controller) {

	const { wave } = Controller;
	const maxVoices = 12;
	const maxOffset = 2;
	const filter = filterBuilder(Controller);

	const sinePosition = new WaveLooper();

	const positions = Array.from(
		{ length: maxVoices },
		() => new WaveLooper()
	);

	const eventTimes = new EventTimes(Controller.envelope);
	let count = 0;

	function multyVoices() {
		let value = 0;
		let size = count;
		for (let i = 0; i <= count; i++) {
			value += WaveForm(positions[i].next(), wave);
		}
		if (wave.sine) {
			value += (Sine(sinePosition.next()) * wave.sine);
			size++;
		} 
		if (wave.noise > 0) {
			return (value + wave.noise * Noise()) / (size + 1 + wave.noise);
		}
		return value / (size + 1);
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
		sinePosition.set(
			frequency,
			wave.fm,
			wave.fmFreq
		);

		eventTimes.restart();

		filter.set();
	}

	const next = () =>
		filter.next(eventTimes.next() * multyVoices());

	return {
		eventTimes,
		next,
		reset,
		setNote(note) {
			let range = Math.max(
				note + (Math.floor(wave.pitch * 8) - 4) * 12,
				0
			);
			reset(
				NoteToFrequency(range)
			);
		},
		end: eventTimes.end.bind(eventTimes)
	};
}