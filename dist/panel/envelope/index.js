"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var EnvelopeGraphic_1 = require("./EnvelopeGraphic");
var styles = {
    button: {
        outline: "none",
        background: "none",
        border: "1px solid #222",
        width: "50%"
    },
    nav: {
        marginTop: "10px",
        width: "80%"
    }
};
var Button = function (_a) {
    var id = _a.id, active = _a.active, onClick = _a.onClick;
    return React.createElement("button", { style: __assign({}, styles.button, { color: (id === active) ? "#FFA928" : "gray" }), onClick: function () { return onClick(id); } }, id);
};
var DisplayPanel_1 = require("../DisplayPanel");
var PanelEnvelope = (function (_super) {
    __extends(PanelEnvelope, _super);
    function PanelEnvelope(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { active: "gain" };
        _this.switch = _this.switch.bind(_this);
        return _this;
    }
    PanelEnvelope.prototype.switch = function (active) {
        this.setState({ active: active });
    };
    PanelEnvelope.prototype.render = function () {
        var active = this.state.active;
        var _a = this.props.env, filter = _a.filter, gain = _a.gain;
        var selectedEnvelope = (active === "filter") ? filter : gain;
        return (React.createElement(DisplayPanel_1.default, { label: "envelope", size: 3 },
            React.createElement("div", { style: styles.nav },
                React.createElement(Button, { id: "gain", active: active, onClick: this.switch }),
                React.createElement(Button, { id: "filter", active: active, onClick: this.switch })),
            React.createElement(EnvelopeGraphic_1.default, { state: selectedEnvelope })));
    };
    return PanelEnvelope;
}(React.PureComponent));
exports.default = PanelEnvelope;
