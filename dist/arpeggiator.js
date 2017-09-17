"use strict";

function arpeggiator(c, start, end) {

	start *= 32;
	end = start + end * 32;
	endIndex = Math.max(end, endIndex);
	c = c.map(function (e) {
		return e - 4 * 12;
	});
	var i = start;
	var arpIndex = 0;
	var direction = 1;

	while (i <= end) {

		var note = 0;

		if (arpIndex >= c.length) {
			var ni = arpIndex % c.length;
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
			direction = -1;
		}

		arpIndex += direction;
		i += 2;
	}
}