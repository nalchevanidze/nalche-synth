"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _templateObject = _taggedTemplateLiteral(["\n\tmargin: 5px;\n\tjustify-content: space-around;\n\tflex-wrap: wrap;\n\tflex-shrink: 0;\n\tbackground:#333333;\n\tpadding:10px;\n"], ["\n\tmargin: 5px;\n\tjustify-content: space-around;\n\tflex-wrap: wrap;\n\tflex-shrink: 0;\n\tbackground:#333333;\n\tpadding:10px;\n"]),
    _templateObject2 = _taggedTemplateLiteral(["\n\tfont-size: 12px;\n\tmargin: 0px;\n\twidth: 100%;\n\ttext-align: center;\n\ttext-transform: uppercase;\n\tcolor: rgb(205, 220, 57);\n\tpadding:10px 0px;\n"], ["\n\tfont-size: 12px;\n\tmargin: 0px;\n\twidth: 100%;\n\ttext-align: center;\n\ttext-transform: uppercase;\n\tcolor: rgb(205, 220, 57);\n\tpadding:10px 0px;\n"]),
    _templateObject3 = _taggedTemplateLiteral(["\n\tdisplay:block;\n\tcolor: white;\n\tbackground:none;\n\toutline: none;\n\tborder: none;\n\tpadding:5px;\n\twidth:100%;\n\ttext-align:center;\n\t&:hover{\n\t\tbackground: #444;\n\t}\n"], ["\n\tdisplay:block;\n\tcolor: white;\n\tbackground:none;\n\toutline: none;\n\tborder: none;\n\tpadding:5px;\n\twidth:100%;\n\ttext-align:center;\n\t&:hover{\n\t\tbackground: #444;\n\t}\n"]);

var _react = require("react");

var React = _interopRequireWildcard(_react);

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Container = _styledComponents2.default.div(_templateObject);

var Label = _styledComponents2.default.h3(_templateObject2);

var Button = _styledComponents2.default.button(_templateObject3);

var PanelPresets = function PanelPresets(_ref) {
	var _ref$data = _ref.data,
	    data = _ref$data === undefined ? [] : _ref$data,
	    active = _ref.active,
	    setPreset = _ref.setPreset;
	return React.createElement(
		Container,
		null,
		React.createElement(
			Label,
			null,
			"Presets"
		),
		React.createElement(
			"div",
			null,
			Object.keys(data).map(function (name, i) {
				return React.createElement(
					Button,
					{
						key: i,
						style: {
							color: name === active ? "red" : "gray"
						},
						onClick: function onClick() {
							return setPreset(name);
						}
					},
					name
				);
			})
		)
	);
};

exports.default = PanelPresets;