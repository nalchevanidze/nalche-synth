import WaveForm from "./WaveForm";
import Envelope from "./Envelope";
import WaveLooper from "./WaveLooper";
import MoogFilter from "./MoogFilter";
import NoteToFrequency from "./NoteToFrequency";

const Noise = ():number => 1 - Math.random() * 2;
const Sine = i => Math.sin(i * Math.PI * 2);

export default function SoundEvent(Controller) {

	const { wave } = Controller;
	const maxVoices:number = 12;
	const maxOffset:number = 2;
	const filter = MoogFilter(Controller);

	const sinePosition:WaveLooper = new WaveLooper();

	const positions = Array.from(
		{ length: maxVoices },
		() => new WaveLooper()
	);

	const envelope:Envelope = new Envelope(Controller.envelope);
	let count:number = 0;

	function multyVoices():number {

		let value:number = 0;
		let size:number = count;

		for (let i:number = 0; i <= count; i++) {

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

	function reset(frequency:number):void {

		count = wave.voices * (maxVoices - 1);
		let middle = Math.floor((count + 1) / 2);

		for (let i = 0; i <= count; i++) {
			let value:number = i - middle;
			let diff:number = value * wave.offset * maxOffset;
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

		envelope.restart();

		filter.set();
	}

	const next = () =>
		filter.next(envelope.next() * multyVoices());

	return {
		envelope,
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
		end: envelope.end.bind(envelope)
	};
}