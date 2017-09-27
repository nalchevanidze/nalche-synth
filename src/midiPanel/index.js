import React from "react";
import KeyboardSVG from "./KeyboardSVG";
import HeaderButton from "./HeaderButton";


class Header extends React.Component {
	render() {
		let { stop, setBPM, BPM, isPlayng } = this.props.global;
		let id = isPlayng ? "pause" : "play";
		return (
			<section
				style={{
					background: "#444",
					color: "#ffa929",
					padding: "5px",
					border: "1px solid #333",
					display: "flex"
				}}
			>
				<HeaderButton id={id} actions={this.props.global} />
				<HeaderButton id={"stop"} actions={this.props.global} />
				<div
					style={{
						padding: "5px",
						fontSize: "12px",
					}}
				>
					<label>BPM</label>
					<input
						style={{
							background: "#444",
							border: "none",
							color: "#ffa929",
							borderBottom: "1px solid"
						}}
						className="bpm-value"
						onChange={setBPM}
						defaultValue={BPM()}

					/>
				</div>
			</section>
		)
	}
}
class MidiDesk extends React.PureComponent {
	render() {
		let { midi, updateMidi, global, currentState = 0 } = this.props;
		return (
			<div
				style={{
					width: "300px",
					overflow: "scroll"
				}}
			>
				<KeyboardSVG
					currentState={currentState}
					updateMidi={this.props.updateMidi}
					setTime={this.props.setTime}
				/>
			</div>
		)
	}
}
export default class melody extends React.PureComponent {
	render() {
		let { global } = this.props;
		return (
			<div
				style={{
					position: "relative",
				}}
			>
				<Header global={global} />
				<MidiDesk
					currentState={this.props.currentState}
					midi={this.props.melody}
					updateMidi={this.props.updateMidi}
					setTime={this.props.setTime}
					global={this.props.global}
				/>
			</div>
		)
	}
}