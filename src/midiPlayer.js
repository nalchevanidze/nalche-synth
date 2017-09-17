let midi = [];
let endIndex = 0;

const sequence = [
	1, 0, 2, 0,
	1, 0, 3, 0,
	1, 0, 0, 2,
	1, 0, 3, 0,
];

function sequencer(c, start, end) {

	start *= 32;
	end = start + end * 32;
	endIndex = Math.max(end, endIndex);
	let i = start;
	let arpIndex = 0;
	let direction = 1;

	while (i <= end) {

		let note = 0;

		if (arpIndex >= sequence.length) {
			arpIndex = 0;
		}

		let noteIndex = sequence[arpIndex];

		if (noteIndex > 0) {
			
			noteIndex--;
			const outIndex = Math.floor( noteIndex / c.length );
			noteIndex = noteIndex%c.length
			note = c[noteIndex] + (12*outIndex) ;
			
			midi[i] = {
				start: [note],
				end: []
			};
			midi[i + 1] = {
				start: [],
				end: [note]
			};
		}

		arpIndex++;
		i += 2;

	}

}


import chordToKeys from "./keysToIndexes";

function melody(melodyList) {

	melodyList.forEach((e, i) => {
		sequencer(
			chordToKeys(e),
			i,
			1
		)
	});

};

const intence = [
	"F1,G#2,C3",
	"D#1,G2,C3",
	"D1,F2,A#2",
	"C#1,F2,A#2",
	"A#1,A#2,C#3",
	"G#1,G#2,C3",
	"F1,G#2,C3",
	"F1,G#2,C3",
].map(
	e => e.split(",")

);



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
		this.play();
		this.seq = sequence;
		this.melody = intence;
		this.updateMidi = this.updateMidi.bind(this);
		this.updateMidi();


	}

	updateMidi(seq) {
		midi = [];
		melody(this.melody)
	}

	stop() {
		clearInterval(this.loop, this.BPM);
		this.loop = undefined;
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
