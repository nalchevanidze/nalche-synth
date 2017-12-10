import SoundEvent, { SoundEventInstance } from "./SoundEvent";
import {
	Controller
} from "../../Controller";

export interface OscManagerInstance {
	active(): SoundEventInstance[];
	clear(): void;
	getOsc(note: number): SoundEventInstance;
}


export default function OSCManager(controller: Controller): OscManagerInstance {

	const stack: SoundEventInstance[] = Array.from({ length: 6 },
		() => SoundEvent(controller)
	);

	const getOsc = (isActive: boolean) => stack.filter(
		osc => isActive === osc.envelope.live
	);

	return {
		active: (): SoundEventInstance[] => getOsc(true),
		clear(): void {
			stack.forEach(osc => osc.end());
		},
		getOsc(note: number): SoundEventInstance {
			let osc = getOsc(false)[0];
			if (!osc) {
				osc = SoundEvent(controller);
				stack.push(osc);
			}
			osc.setNote(note);
			return osc;
		}
	};
}