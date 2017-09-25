"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = SvgCoordinates;
function SvgCoordinates(svg, event) {
    var clientX = event.clientX,
        clientY = event.clientY;

    var point = svg.createSVGPoint();
    point.x = clientX;
    point.y = clientY;
    return point.matrixTransform(svg.getScreenCTM().inverse());
}