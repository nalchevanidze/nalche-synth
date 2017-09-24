export default function SvgCoordinates(svg, event) {
    let {
		clientX,
        clientY
	} = event;
    var point = svg.createSVGPoint();
    point.x = clientX;
    point.y = clientY;
    return point.matrixTransform(svg.getScreenCTM().inverse());
}