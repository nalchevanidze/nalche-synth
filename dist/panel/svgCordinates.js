"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function SvgCoordinates(svg, event) {
    if (event.type === "touchmove") {
        event = event.touches[0];
    }
    let point = svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    return point.matrixTransform(svg.getScreenCTM().inverse());
}
exports.default = SvgCoordinates;
