"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _KeyboardPattern = require("./KeyboardPattern");

var _KeyboardPattern2 = _interopRequireDefault(_KeyboardPattern);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _svgCordinates5 = require("../panel/svgCordinates");

var _svgCordinates6 = _interopRequireDefault(_svgCordinates5);

var _standartMidi = require("../standartMidi");

var _standartMidi2 = _interopRequireDefault(_standartMidi);

var _TimelinePattern = require("./TimelinePattern");

var _TimelinePattern2 = _interopRequireDefault(_TimelinePattern);

var _Quarter = require("./Quarter");

var _Quarter2 = _interopRequireDefault(_Quarter);

var _noteFromXY = require("./noteFromXY");

var _noteFromXY2 = _interopRequireDefault(_noteFromXY);

var _noteDetector = require("./noteDetector");

var _noteDetector2 = _interopRequireDefault(_noteDetector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var count = 8;


var flatten = function flatten(arr) {
	return arr.reduce(function (acc, val, i) {
		return Array.isArray(val) ? acc.concat(val.map(function (e) {
			return _extends({}, e, { index: i });
		})) : acc;
	}, []);
};

function deepen(flat) {

	_standartMidi2.default.forEach(function (e, i) {
		_standartMidi2.default[i] = null;
	});

	flat.forEach(function (_ref) {
		var index = _ref.index,
		    at = _ref.at,
		    id = _ref.id,
		    length = _ref.length;


		if (!_standartMidi2.default[index]) {
			_standartMidi2.default[index] = [];
		}

		_standartMidi2.default[index].push({ at: at, id: id, length: length });
	});

	return _standartMidi2.default;
}

var KeyboardSVG = function (_React$PureComponent) {
	_inherits(KeyboardSVG, _React$PureComponent);

	function KeyboardSVG(props) {
		_classCallCheck(this, KeyboardSVG);

		var _this = _possibleConstructorReturn(this, (KeyboardSVG.__proto__ || Object.getPrototypeOf(KeyboardSVG)).call(this, props));

		_this.state = {
			selectZone: null,
			notes: [],
			selected: []
		};

		_this.position = _this.position.bind(_this);
		_this.levelMove = _this.levelMove.bind(_this);
		_this.clearPoint = _this.clearPoint.bind(_this);
		_this.mouseDown = _this.mouseDown.bind(_this);
		_this.setTime = _this.setTime.bind(_this);
		_this.deleteEvent = _this.deleteEvent.bind(_this);
		_this.hide = false;
		return _this;
	}

	_createClass(KeyboardSVG, [{
		key: "componentWillMount",
		value: function componentWillMount() {
			this.hide = false;
			this.target = _reactDom2.default.findDOMNode(this);
			this.state.notes = flatten(_standartMidi2.default);
			document.addEventListener("keydown", this.deleteEvent);
		}
	}, {
		key: "deleteEvent",
		value: function deleteEvent(event) {

			if (event.key === "Delete") {

				this.setState({
					selected: []
				});
			}
			deepen(this.state.notes);
			this.props.updateMidi();
		}
	}, {
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(next) {
			this.state.notes = flatten(_standartMidi2.default);
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			this.hide = false;
			this.target = _reactDom2.default.findDOMNode(this);
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			this.hide = true;
			this.target = null;
			document.removeEventListener("keydown", this.deleteEvent);
		}
	}, {
		key: "position",
		value: function position(event) {
			var _svgCordinates = (0, _svgCordinates6.default)(this.target, event),
			    x = _svgCordinates.x,
			    y = _svgCordinates.y;

			var length = x - this.currentNote.startedAt;
			if (length > 0) {
				this.currentNote.note.length = Math.max(Math.floor(length / 4.5), 1);
			}
			this.setState({ m: Math.random() });
		}
	}, {
		key: "setZone",
		value: function setZone(event) {
			var _svgCordinates2 = (0, _svgCordinates6.default)(this.target, event),
			    x = _svgCordinates2.x,
			    y = _svgCordinates2.y;

			var _state$selectZone = this.state.selectZone,
			    x1 = _state$selectZone.x1,
			    y1 = _state$selectZone.y1;

			this.setState({
				selectZone: {
					x1: x1,
					y1: y1,
					x2: x,
					y2: y
				}
			});
		}
	}, {
		key: "levelMove",
		value: function levelMove(event) {

			if (this.currentNote) {
				this.position(event);
			}
			if (this.state.selectZone) {
				this.setZone(event);
			}
		}
	}, {
		key: "clearPoint",
		value: function clearPoint() {

			if (this.currentNote) {
				var _currentNote = this.currentNote,
				    index = _currentNote.index,
				    note = _currentNote.note;

				if (!_standartMidi2.default[index]) {
					_standartMidi2.default[index] = [];
				}
				_standartMidi2.default[index].push(note);
				this.currentNote = null;
				this.props.updateMidi();
				window.localStorage.midi = JSON.stringify(_standartMidi2.default);
				this.setState({ notes: flatten(_standartMidi2.default) });
			}

			if (this.state.selectZone) {
				this.setState({
					selectZone: null
				});
				this.select();
			}
		}
	}, {
		key: "select",
		value: function select() {

			var rawNotes = [].concat(_toConsumableArray(this.state.selected), _toConsumableArray(this.state.notes));

			var selected = [],
			    notes = [];
			var _state$selectZone2 = this.state.selectZone,
			    x1 = _state$selectZone2.x1,
			    x2 = _state$selectZone2.x2,
			    y1 = _state$selectZone2.y1,
			    y2 = _state$selectZone2.y2;


			var minIndex = Math.floor((360 - y2) / 10);
			var maxIndex = Math.floor((360 - y1) / 10);

			function ff(e) {

				var index = _noteDetector2.default.indexOf(e);
				var x = (e.index * 8 + e.at) * 5;
				return x > x1 && x < x2 && index > minIndex && index < maxIndex;
			}

			rawNotes.forEach(function (e) {
				return ff(e) ? selected.push(e) : notes.push(e);
			});

			this.setState({
				selected: selected,
				notes: notes
			});
		}
	}, {
		key: "deleteNote",
		value: function deleteNote(note, event) {
			var array = _standartMidi2.default[note.index];

			var arrayIndex = array.findIndex(function (arrayNote) {
				return note.at === arrayNote.at && note.id === arrayNote.id;
			});

			array.splice(arrayIndex, 1);
			this.props.updateMidi();
			this.setState({ notes: flatten(_standartMidi2.default) });
		}
	}, {
		key: "setTime",
		value: function setTime(event) {
			var _svgCordinates3 = (0, _svgCordinates6.default)(this.target, event),
			    x = _svgCordinates3.x;

			var time = Math.floor(x / 5);
			this.props.setTime(time);
		}
	}, {
		key: "mouseDown",
		value: function mouseDown(event) {

			if (this.props.actionType === "draw") {
				this.currentNote = (0, _noteFromXY2.default)((0, _svgCordinates6.default)(this.target, event));
			}
			if (this.props.actionType === "select") {
				var _svgCordinates4 = (0, _svgCordinates6.default)(this.target, event),
				    x = _svgCordinates4.x,
				    y = _svgCordinates4.y;

				this.setState({
					selectZone: {
						x1: x,
						y1: y,
						x2: x,
						y2: y
					}
				});
			}
		}
	}, {
		key: "render",
		value: function render() {
			var notestep = 10;
			var stageWidth = count * 80;
			var state = this.props.currentState * notestep / 2;
			var stageHeigth = 360;
			return _react2.default.createElement(
				"svg",
				{
					viewBox: [0, -20, stageWidth, stageHeigth].join(" "),
					width: stageWidth + "px",
					height: stageHeigth + "px",
					onMouseMove: this.levelMove,
					onTouchMove: this.levelMove,
					onMouseLeave: this.clearPoint,
					onTouchEnd: this.clearPoint,
					onMouseUp: this.clearPoint
				},
				_react2.default.createElement(_TimelinePattern2.default, null),
				_react2.default.createElement(_KeyboardPattern2.default, null),
				_react2.default.createElement("rect", {
					fillOpacity: "0",
					width: stageWidth, height: 360,
					onTouchStart: this.mouseDown,
					onMouseDown: this.mouseDown
				}),
				_react2.default.createElement("rect", {
					fillOpacity: "0",
					y: -20,
					height: 20,
					width: stageWidth,
					onTouchStart: this.setTime,
					onMouseDown: this.setTime
				}),
				_react2.default.createElement("line", { x1: state, x2: state, y1: -20, y2: stageHeigth, stroke: "red" }),
				_react2.default.createElement(
					"g",
					null,
					_react2.default.createElement(_Quarter2.default, {
						quard: this.state.notes,
						index: 0,
						mouseDown: this.deleteNote.bind(this),
						updateMidi: this.props.updateMidi
					}),
					this.currentNote ? _react2.default.createElement(_Quarter2.default, {
						quard: [this.currentNote.note],
						index: this.currentNote.index,
						updateMidi: this.props.updateMidi
					}) : null,
					_react2.default.createElement(_Quarter2.default, {
						quard: this.state.selected,
						index: 0,
						color: "#03A9F4",
						mouseDown: this.deleteNote.bind(this),
						updateMidi: this.props.updateMidi
					})
				),
				this.state.selectZone ? _react2.default.createElement("rect", {
					stroke: "red",
					fill: "red",
					fillOpacity: 0.1,
					x: this.state.selectZone.x1,
					y: this.state.selectZone.y1,
					width: this.state.selectZone.x2 - this.state.selectZone.x1,
					height: this.state.selectZone.y2 - this.state.selectZone.y1
				}) : null
			);
		}
	}]);

	return KeyboardSVG;
}(_react2.default.PureComponent);

exports.default = KeyboardSVG;
;