import React from "react";
import KeyboardSVG from "./KeyboardSVG";





const Button = ({ id, onClick }) =>
	<button
		onClick={onClick}
		style={{
			fontSize: "16px",
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


class Header extends React.PureComponent {
	render() {
		let { play, stop, setBPM, BPM } = this.props.global;
		return (
			<h3 style={{

				background: "#444"

			}}>
				<section
					style={{
						display: "flex",

					}}
				>
					<Button onClick={play} id="play" />
					<Button onClick={stop} id="stop" />
				</section>
				<label>BPM</label>
				<input
					className="bpm-value"
					onChange={setBPM}
					defaultValue={BPM()}
					style={{ color: "black" }}
				/>
			</h3>
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
				<KeyboardSVG currentState={currentState} updateMidi={this.props.updateMidi} />
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
					position: "relative"
				}}
			>
				<Header global={global} />
				<MidiDesk
					currentState={this.props.currentState}
					midi={this.props.melody}
					updateMidi={this.props.updateMidi}
					global={this.props.global}
				/>
			</div>
		)
	}
}