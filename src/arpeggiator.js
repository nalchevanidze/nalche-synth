function arpeggiator(c, start, end) {

	start *= 32;
	end = start + end * 32;
	endIndex = Math.max(end, endIndex);
	c = c.map(e => e - 4 * 12);
	let i = start;
	let arpIndex = 0;
	let direction = 1;

	while (i <= end) {

		let note = 0;

		if (arpIndex >= c.length) {
			const ni = arpIndex % c.length;
			note = c[ni] + Math.floor(arpIndex / c.length) * 12;
		} else {
			note = c[arpIndex];
		}

		midi[i] = {
			start: [note],
			end: []
		};

		midi[i + 1] = {
			start: [],
			end: [note]
		};

		if (arpIndex < 1) {
			direction = 1;
		}

		if (arpIndex > c.length) {
			direction = -1
		}

		arpIndex += direction;
		i += 2;

	}
}