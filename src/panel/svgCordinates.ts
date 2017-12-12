export type SelectEvent = React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>;

export default function SvgCoordinates(svg: SVGSVGElement, event: SelectEvent)
:{
	x:number;
	y:number;
} {

	if (event.type === "touchmove") {
		event = event.touches[0];
	}

	let point = svg.createSVGPoint();

	point.x = event.clientX;
	point.y = event.clientY;
	
	return point.matrixTransform(svg.getScreenCTM().inverse());

}