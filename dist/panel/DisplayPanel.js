"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ButtonWave_1 = require("./ButtonWave");
var styled_components_1 = require("styled-components");
var styles = {
    panelHeader: {
        color: "#03A9F4",
        fontSize: "12px",
        margin: "0px",
        width: "100%",
        textAlign: "center",
        textTransform: "uppercase",
    }
};
var Container = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\tdisplay: flex;\n\tmargin: 5px;\n\tjustify-content: space-around;\n\tflex-wrap: wrap;\n\tflex-shrink: 0;\n"], ["\n\tdisplay: flex;\n\tmargin: 5px;\n\tjustify-content: space-around;\n\tflex-wrap: wrap;\n\tflex-shrink: 0;\n"])));
var Label = styled_components_1.default.h3(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n\tfont-size: 12px;\n\tmargin: 0px;\n\twidth: 100%;\n\ttext-align: center;\n\ttext-transform: uppercase;\n"], ["\n\tfont-size: 12px;\n\tmargin: 0px;\n\twidth: 100%;\n\ttext-align: center;\n\ttext-transform: uppercase;\n"])));
var Button = styled_components_1.default.button(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n\tdisplay: block;\n\twidth:12px;\n\theight:12px;\n\tborder-radius: 6px;\n\tmargin: 2px;\n\tborder: 3px solid #894a36;\n\tpadding: 0px;\n\tbackground: ", ";\n\t&:focus{\n\t\toutline: none;\n\t}\n"], ["\n\tdisplay: block;\n\twidth:12px;\n\theight:12px;\n\tborder-radius: 6px;\n\tmargin: 2px;\n\tborder: 3px solid #894a36;\n\tpadding: 0px;\n\tbackground: ", ";\n\t&:focus{\n\t\toutline: none;\n\t}\n"])), function (props) { return props.isActive ? "#FF5722" : "none"; });
var TurnOnButton = function () { return React.createElement(Button, null); };
var DisplayPanel = function (_a) {
    var children = _a.children, label = _a.label, _b = _a.size, size = _b === void 0 ? 1 : _b, target = _a.target, onChange = _a.onChange, onOff = _a.onOff, isActive = _a.isActive, _c = _a.color, color = _c === void 0 ? "#2196f3" : _c, _d = _a.list, list = _d === void 0 ? [] : _d;
    return React.createElement(Container, { style: {
            width: (size * 50 + (size - 1) * 20) + "px",
        } },
        React.createElement("div", { style: {
                display: "flex",
                height: 10
            } },
            onOff ? React.createElement(Button, { onClick: onOff, color: color, isActive: isActive }) : null,
            React.createElement(Label, { style: { color: color } }, label)),
        React.createElement(Container, { style: {
                width: (size * 50 + (size - 1) * 20) + "px",
                opacity: (onOff && !isActive) ? 0.3 : 1
            } },
            children,
            list.map(function (par, i) { return React.createElement(ButtonWave_1.default, __assign({}, par, { key: i, color: color, target: target, onChange: function (stateChanges) {
                    if (onChange) {
                        onChange(stateChanges);
                    }
                } })); })));
};
exports.default = DisplayPanel;
var templateObject_1, templateObject_2, templateObject_3;
