import React from "react";
import HeaderButton from "./HeaderButton";
export default class MidiHeader extends React.Component {
	render() {
		let { setBPM, BPM, isPlayng } = this.props.global;
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
				<HeaderButton
					id={"draw"}
					color={this.props.actionType === "draw" ? "#ffa929" : "#777"}
					actions={this.props.setMode}
				/>
				<HeaderButton
					id={"select"}
					color={this.props.actionType === "select" ? "#ffa929" : "#777"}
					actions={this.props.setMode}
				/>
			</section>
		);
	}
}