import keysToIndexes from "./keysToIndexes";
export default function chordToKeys(list) {
	return list.map(
		keysToIndexes
	);
}