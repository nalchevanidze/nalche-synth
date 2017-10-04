import SoundEvent from "./SoundEvent";

export default function OSCManager(Controller) {

	const stack = Array.from(
		{ length: 6 },
		() => SoundEvent(Controller)
	);

	const getFreeOsc = () => stack.filter(
		osc => !osc.eventTimes.live
	)[0];

	return {
		active: () => stack.filter(
			osc => osc.eventTimes.live
		),
		clear() {
			stack.forEach(osc => osc.end());
		},
		getOsc(note) {
			let osc = getFreeOsc();
			if (!osc) {
				osc = SoundEvent(Controller);
				stack.push(osc);
			}
			osc.setNote(note);
			return osc;
		}
	};
}