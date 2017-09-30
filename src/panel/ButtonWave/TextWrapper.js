import React from "react";

export default class TextWrapper extends React.PureComponent {
	render() {
		return (
			<div>
				{
					this.props.children
				}
				<p
					style={{
						color: this.props.color,
						width: "100%",
						textAlign: "center",
						margin: "0px"
					}}
				>{this.props.id}</p>
			</div>
		);
	}

}