import React from "react";
import KeyboardSVG from "./KeyboardSVG";





const Button = ({ id, onClick }) =>
	<button
		onClick={onClick}
		style={{
			outline: "none",
			border: "none",
			fontSize: "14px",
			textTransform: "uppercase",
			display: "block",
			color: "#ffa929",
			padding: "3px 18px",
			cursor: "pointer",
			background: "#444"
		}}
	>
		{
			id
		}
	</button>
	;


class Header extends React.Component {
	render() {
		let { play, pause, stop, setBPM, BPM, isPlayng } = this.props.global;
		let id = isPlayng ? "pause" : "play";
		let action = this.props.global[id];
		return (
			<section
				style={{
					background: "#444",
					color: "#ffa929",
					padding: "5px",
					fontSize:"12px",
					border: "1px solid #333"
				}}
			>
				<h3 style={{
					margin: "0px",
					padding: "0px",
					display: "flex"
				}}>
					<Button onClick={action} id={id} />
					<Button onClick={stop} id="stop" />
				</h3>
				<label>BPM</label>
				<input

					style={{
						background: "#444",
						margin: "10px 5px",
						border: "none",
						color: "#ffa929"
					}}

					className="bpm-value"
					onChange={setBPM}
					defaultValue={BPM()}

				/>
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