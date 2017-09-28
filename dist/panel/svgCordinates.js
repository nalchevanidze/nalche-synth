"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = SvgCoordinates;
function SvgCoordinates(svg, event) {

    if (event.type === "touchmove") {
        event = event.touches[0];
    }

    var _event = event,
        clientX = _event.clientX,
        clientY = _event.clientY;

    var point = svg.createSVGPoint();
    point.x = clientX;
    point.y = clientY;
    return point.matrixTransform(svg.getScreenCTM().inverse());
}