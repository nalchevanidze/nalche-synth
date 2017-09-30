export default function SvgCoordinates(svg, event) {

	if (event.type === "touchmove") {
		event = event.touches[0];
	}

	let {
		clientX,
		clientY
	} = event;
	let point = svg.createSVGPoint();
	point.x = clientX;
	point.y = clientY;
	return point.matrixTransform(svg.getScreenCTM().inverse());
    
}