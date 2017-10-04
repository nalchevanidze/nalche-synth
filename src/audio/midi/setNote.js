import keysToIndexes from "../../keysToIndexes";

function setValue(
	midi,
	i,
	type,
	value
) {

	if (!midi[i]) {
		midi[i] = {
			start: [],
			end: []
		};
	}
	midi[i][type].push(keysToIndexes(value));

}

export default function setNote(midi, startIndex, note) {
	let start = startIndex + note.at;
	let end = start + note.length;
	setValue(midi, start, "start", note.id);
	setValue(midi, end, "end", note.id);
}