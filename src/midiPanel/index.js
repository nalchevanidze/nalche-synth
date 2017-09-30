import React from "react";
import KeyboardSVG from "./KeyboardSVG";
import MidiHeader from "./MidiHeader";


class MidiDesk extends React.PureComponent {
	render() {
		return (
			<div
				style={{
					width: "300px",
					overflow: "scroll"
				}}
			>
				<KeyboardSVG {...this.props} />
			</div>
		);
	}
}
export default class melody extends React.PureComponent {

	constructor(props) {

		super(props);

		this.state = {
			actionType: "select"
		};

		this.modes = {
			draw: () => {
				this.setState({ actionType: "draw" });
			}
			,
			select: () => {
				this.setState({ actionType: "select" });
			}
		};

	}
	render() {
		let { global } = this.props;
		return (
			<div
				style={{
					position: "relative",
				}}
			>
				<MidiHeader
					global={global}
					setMode={this.modes}
					actionType={this.state.actionType}
				/>
				<MidiDesk
					currentState={this.props.currentState}
					midi={this.props.melody}
					updateMidi={this.props.updateMidi}
					setTime={this.props.setTime}
					global={this.props.global}
					actionType={this.state.actionType}
				/>
			</div>
		);
	}
}