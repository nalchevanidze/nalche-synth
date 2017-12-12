import * as React from 'react';
export type SelectEvent = React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>;

export interface Point {
	x: number;
	y?: number;
}

export interface ControlPointProps {
	cx: number;
	cy: number;
	position(event: SelectEvent): Point;
	onChange(point: Point): void;
	point: {
		current: (event: SelectEvent) => void
	}
}

export default class ControlPoint extends React.Component<ControlPointProps> {

	/**
	 * on mouse move updates props.onChange with new position of point
	 * @event - Mouse Move event
	 */ 
	levelMove = (event: SelectEvent): void => {
		this.props.onChange(
			this.props.position(event)
		);
	}

	/**
	 * sets LevelMove as main function on 
	 * MouseMove event on envelope display
	 */ 
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