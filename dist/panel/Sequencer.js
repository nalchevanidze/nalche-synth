"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _DisplayPanel = require("./DisplayPanel");

var _DisplayPanel2 = _interopRequireDefault(_DisplayPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var stepSize = 8;
var Sequence = function Sequence(_ref) {
	var chord = _ref.chord,
	    _onClick = _ref.onClick;
	return _react2.default.createElement(
		"li",
		{

			style: {
				width: stepSize + "px",
				listStyle: "none",
				border: "1px solid #333"
			}

		},
		[1, 2, 3, 4].reverse().map(function (index) {
			return _react2.default.createElement("button", {
				style: {
					width: "100%",
					border: "none",
					outline: "none",
					borderBottom: "1px solid #333",
					height: stepSize + "px",
					display: "block",
					background: chord.indexOf(index) !== -1 ? "#ffa929" : "#555"

				},
				key: index,
				onClick: function onClick() {
					return _onClick(index);
				}
			});
		})
	);
};

var Sequencer = function (_React$PureComponent) {
	_inherits(Sequencer, _React$PureComponent);

	function Sequencer(props) {
		_classCallCheck(this, Sequencer);

		var _this = _possibleConstructorReturn(this, (Sequencer.__proto__ || Object.getPrototypeOf(Sequencer)).call(this, props));

		_this.state = {
			value: 0
		};
		return _this;
	}

	_createClass(Sequencer, [{
		key: "setNew",
		value: function setNew(i, index) {

			var chord = this.props.seq[i];

			var chordIndex = chord.indexOf(index);
			if (chordIndex === -1) {
				chord.push(index);
			} else {
				chord.splice(chordIndex, 1);
			}
			this.props.setSequence(this.props.seq);
			this.setState({ value: Math.random() });
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			return _react2.default.createElement(
				_DisplayPanel2.default,
				{ label: "sequencer", size: 3 },
				_react2.default.createElement(
					"ul",
					{
						style: {
							display: "flex",
							margin: "0px",
							padding: "0px"
						}
					},
					this.props.seq.map(function (chord, i) {
						return _react2.default.createElement(Sequence, {
							key: i,
							chord: chord,
							onClick: function onClick(index) {
								return _this2.setNew(i, index);
							}
						});
					})
				)
			);
		}
	}]);

	return Sequencer;
}(_react2.default.PureComponent);

exports.default = Sequencer;