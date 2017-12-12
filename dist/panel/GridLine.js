"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const color = "#FFEB3B";
const GridLine = () => React.createElement("g", null,
    React.createElement("defs", null,
        React.createElement("pattern", { width: "100", height: "100", patternUnits: "userSpaceOnUse", id: "grid" },
            React.createElement("g", { stroke: color, fill: "none", strokeWidth: 0.3, strokeOpacity: 0.3 },
                React.createElement("pattern", { width: "10", height: "10", patternUnits: "userSpaceOnUse", id: "s-grid" },
                    React.createElement("path", { strokeWidth: 0.3, d: "M 10 0 L 0 0 0 10 0 0" })),
                React.createElement("path", { d: "M 100 0 L 0 0 0 100 0 0" }),
                React.createElement("rect", { width: "100", height: "100", fill: "url(#s-grid)" })))),
    React.createElement("rect", { width: "100%", height: "100%", fill: "url(#grid)", className: "grids" }));
exports.default = GridLine;
