export default function NoteToFrequency(index: number): number {

	index = Number(index);

	if (Number.isNaN(index)) {
		throw new Error("Invalid Note");
	}

	let pow: number = (index - 49) / 12;

	return (2 ** pow) * 440;

}