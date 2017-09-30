export default function noteFromXY({ x, y }) {
	let i = Math.floor(1 + (360 - y) / 10);
	let position = Math.floor(x / 5);
	return {
		length: 1,
		i,
		position
	};

}