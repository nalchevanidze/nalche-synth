import * as React from 'react';
export type SelectEvent = React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>;

export interface Point {
	x:number;
	y?:number;
}

export interface ControlPointProps {
	cx: number;
	cy: number;
	position(event: SelectEvent ): Point;
	onChange(point: Point): void;
	point: {
		current: (event: SelectEvent) => void
	}
}

export default class ControlPoint extends React.Component<ControlPointProps> {

	// point moves
	levelMove = (event: SelectEvent): void => {
		let { onChange, position } = this.props;
		if (onChange) {
			onChange(
				position(event)
			);
		}
	}

	//point is selected
	mouseDown = (): void => {
		this.props.point.current = this.levelMove;
	}

	render() {
		let { cx, cy } = this.props;
		return (
			<circle
				cx={cx}
				cy={cy}
				onTouchStart={this.mouseDown}
				onMouseDown={this.mouseDown}
				r={5}
			/>
		);
	}
}