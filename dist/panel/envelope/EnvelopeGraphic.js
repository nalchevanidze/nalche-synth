"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _GridLine = require("../GridLine");

var _GridLine2 = _interopRequireDefault(_GridLine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var EnvelopeGraphic = function EnvelopeGraphic(_ref) {
    var attack = _ref.attack,
        release = _ref.release,
        sustain = _ref.sustain,
        decay = _ref.decay;


    attack = 10 + attack * 80;
    decay = attack + decay * 80;
    var sustainX = decay + 20;
    sustain = (1 - sustain) * 100;
    release = sustainX + release * 80;

    var point_attack = [attack, 100];
    var point_sustain = [sustainX, sustain];

    var point_sustain_down = [sustainX, 100];
    var point_attack_down = [attack, 100];

    var Line_attack = [[attack, 0], [attack, 100]];

    var Line_sustain = [[sustainX, 100], [sustainX, sustain]];

    return _react2.default.createElement(
        "svg",
        { viewBox: "0 -10 200 110", width: "120px", height: "80px" },
        _react2.default.createElement(_GridLine2.default, null),
        _react2.default.createElement("path", { id: "attack", d: "M" + [0, 100, 10, 100].concat(Line_attack, [0, 100]), fill: "#444", fillOpacity: "0.1" }),
        _react2.default.createElement("path", { id: "sustain", d: "M" + [].concat(_toConsumableArray(Line_attack.reverse()), [decay, sustain], _toConsumableArray(Line_sustain.reverse())), fill: "#444", fillOpacity: "0.15" }),
        _react2.default.createElement("path", { id: "release", d: "M" + [].concat(Line_sustain, [release, 100]), fill: "#444", fillOpacity: "0.1" }),
        _react2.default.createElement(
            "g",
            { stroke: "#444", fill: "none", strokeWidth: "0.25" },
            _react2.default.createElement("path", { d: "M" + [decay, sustain, decay, 100] }),
            _react2.default.createElement("path", { d: "M" + Line_attack }),
            _react2.default.createElement("path", { d: "M" + Line_sustain }),
            _react2.default.createElement("path", { d: "M"[(0, 100, 10, 100, attack, 0, sustainX, sustain, release, 100, 200, 100)] })
        )
    );
};

exports.default = EnvelopeGraphic;