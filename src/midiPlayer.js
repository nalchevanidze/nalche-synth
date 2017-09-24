import chordToKeys from "./chordToKeys";
import keysToIndexes from "./keysToIndexes";

let midi = [];
let endIndex = 0;
let sequence = [];
function sequencer(c, start, end) {
	start *= 32;
	end = start + end * 32;
	endIndex = Math.max(end, endIndex);
	let i = start;
	let arpIndex = 0;
	let direction = 1;
	while (i <= end) {
		let note = 0;
		// makes saquence loop
		if (arpIndex >= sequence.length) {
			arpIndex = 0;
		}
		let currentChord = sequence[arpIndex];
		if (currentChord.length > 0) {
			const chord = currentChord.map((noteIndex) => {
				noteIndex--;
				const outIndex = Math.floor(noteIndex / c.length);
				noteIndex = noteIndex % c.length
				return c[noteIndex] + (12 * outIndex);
			})
			midi[i] = {
				start: chord,
				end: []
			};
			midi[i + 1] = {
				start: [],
				end: chord
			};
		}
		arpIndex++;
		i += 2;
	}
}

function setValue(i, type, value) {

	if (!midi[i]) {
		midi[i] = {
			start: [],
			end: []
		}
	};
	midi[i][type].push(keysToIndexes(value));

	endIndex = Math.max(i, endIndex);
}

function setNote(startIndex, note) {
	let start = startIndex + note.at;
	let end = start + note.length;
	setValue(start, "start", note.id);
	setValue(end, "end", note.id);
}

// "F1,G#2,C3",
// "G#1,G#2,C3",
// "A#1,A#2,D#2",
// "C#2,G#2,G#3",
const standartMidi = [

	[
		{
			at: 0,
			id: "F#1",
			length: 2
		},
		{
			at: 2,
			id: "G#2",
			length: 2
		},
		{
			at: 3,
			id: "C#3",
			length: 1
		}
	],

	null,

	[
		{
			at: 4,
			id: "F#1",
			length: 2
		},
		{
			at: 2,
			id: "G#2",
			length: 4
		},
		{
			at: 0,
			id: "C#3",
			length: 24
		}
	],
	null
];

function melody(melodyList) {
	standartMidi.forEach((e, i) => {
		if (e) {

			e.forEach((note) => {

				setNote(i * 8, note);

			})
		}
	})
	// melodyList.forEach((e, i) => {
	// 	sequencer(
	// 		chordToKeys(e),
	// 		i,
	// 		1
	// 	)
	// });
};

function addQuard(note, index) {
	const noteStart = midi[index * 16].start;
	noteStart.push(note);
	const noteEnd = midi[(index + 1) * 16 - 1].end;
	noteEnd.push(note);
}


export default class MidiPlayer {
	constructor(osc) {
		this.osc = osc;
		this.BPM = 60 * 1000 / (128 * 8);
		this.next = this.next.bind(this);
		this.currentState = 0;
		this.seq = osc.sequence;
		sequence = osc.sequence;
		this.melody = osc.midi;
		this.updateMidi = this.updateMidi.bind(this);
		this.updateMidi();
		this.updateComponent = osc.component;
	}
	updateMidi(seq) {
		midi = [];
		melody(this.melody)
	}
	stop() {
		clearInterval(this.loop, this.BPM);
		this.loop = undefined;
		this.currentState = 0;
	}
	play() {
		if (this.loop) return;
		this.index = 0;
		this.loop = setInterval(this.next, this.BPM);
	}
	executeState() {
		const { end, start } = this.state;
		const { osc } = this;
		end.forEach(osc.stop);
		start.forEach(osc.play)
	}
	next() {
		this.currentState = this.index / endIndex;

		if (this.updateComponent) {
			this.updateComponent(this.currentState);
		}

		this.state = midi[this.index];
		if (this.state) {
			this.executeState();
		}
		this.index++;
		if (this.index >= endIndex) {
			this.index = 0;
		};
	}
}
