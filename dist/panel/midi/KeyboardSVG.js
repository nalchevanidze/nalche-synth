"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
//import standartMidi from "../standartMidi";


var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _KeyboardPattern = require("./KeyboardPattern");

var _KeyboardPattern2 = _interopRequireDefault(_KeyboardPattern);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _svgCordinates7 = require("../svgCordinates");

var _svgCordinates8 = _interopRequireDefault(_svgCordinates7);

var _TimelinePattern = require("./TimelinePattern");

var _TimelinePattern2 = _interopRequireDefault(_TimelinePattern);

var _Quarter = require("./Quarter");

var _Quarter2 = _interopRequireDefault(_Quarter);

var _noteFromXY = require("./noteFromXY");

var _noteFromXY2 = _interopRequireDefault(_noteFromXY);

var _noteDetector = require("./noteDetector");

var _noteDetector2 = _interopRequireDefault(_noteDetector);

var _KeysPattern = require("./KeysPattern");

var _KeysPattern2 = _interopRequireDefault(_KeysPattern);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function notePosition(index, at) {
	return index * 8 + at;
}

function sortNumbers(n1, n2) {
	return [n1, n2].sort(function (a, b) {
		return a > b ? 1 : -1;
	});
}

function isInArea(
//Area
_ref,
//Note
_ref2) {
	var x1 = _ref.x1,
	    x2 = _ref.x2,
	    y1 = _ref.y1,
	    y2 = _ref.y2;
	var position = _ref2.position,
	    i = _ref2.i;

	var y = 360 - 10 * i;
	var x = position * 5;
	return x > x1 && x < x2 && y > y1 && y < y2;
}

var flatten = function flatten(arr) {
	return arr.reduce(function (acc, val, i) {
		return Array.isArray(val) ? acc.concat(val.map(function (e) {
			return _extends({}, e, {
				index: i,
				i: _noteDetector2.default.indexOf(e),
				position: notePosition(i, e.at)
			});
		})) : acc;
	}, []);
};

function deepen(flat) {

	//let midi = standartMidi;
	var midi = [];

	midi.forEach(function (e, i) {
		midi[i] = [];
	});

	flat.forEach(function (_ref3) {
		var length = _ref3.length,
		    position = _ref3.position,
		    i = _ref3.i;

		var index = Math.floor(position / 8);
		var at = position % 8;
		var id = _noteDetector2.default.idByIndex(i - 1);
		midi[index] = midi[index] || [];
		midi[index].push({ at: at, id: id, length: length });
	});

	return midi;
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
			this.state.notes = flatten(this.props.midi);
			document.addEventListener("keydown", this.deleteEvent);
		}
	}, {
		key: "refreshMidi",
		value: function refreshMidi(newNotes) {
			var notes = deepen(newNotes || this.state.notes);
			this.props.updateMidi(notes);
		}
	}, {
		key: "deleteEvent",
		value: function deleteEvent(event) {
			if (event.key === "Delete") {
				this.setState({
					selected: []
				});
			}
			this.refreshMidi();
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
		key: "startCreatingNote",
		value: function startCreatingNote(event) {

			this.setState({
				currentNote: (0, _noteFromXY2.default)((0, _svgCordinates8.default)(this.target, event))
			});
		}
	}, {
		key: "startMoveSelectedNotes",
		value: function startMoveSelectedNotes(note, event) {
			this.setState({
				moveStart: (0, _svgCordinates8.default)(this.target, event)
			});
		}
	}, {
		key: "startResizeSelectedNotes",
		value: function startResizeSelectedNotes(note, event) {
			this.setState({
				resizeStart: (0, _svgCordinates8.default)(this.target, event)
			});
		}
	}, {
		key: "startSelecting",
		value: function startSelecting(event) {
			var _svgCordinates = (0, _svgCordinates8.default)(this.target, event),
			    x = _svgCordinates.x,
			    y = _svgCordinates.y;

			this.setState({
				selectZone: {
					startX: x,
					startY: y,
					x1: x,
					y1: y,
					x2: x,
					y2: y
				}
			});
		}
	}, {
		key: "levelMove",
		value: function levelMove(event) {
			if (this.state.currentNote) {
				this.editCreatingNote(event);
			}
			if (this.state.selectZone) {
				this.setZone(event);
			}

			if (this.state.moveStart) {
				this.moveNotes(event);
			}
			if (this.state.resizeStart) {
				this.resizeNotes(event);
			}
		}
	}, {
		key: "editCreatingNote",
		value: function editCreatingNote(event) {
			var _svgCordinates2 = (0, _svgCordinates8.default)(this.target, event),
			    x = _svgCordinates2.x;

			var _state$currentNote = this.state.currentNote,
			    length = _state$currentNote.length,
			    position = _state$currentNote.position,
			    i = _state$currentNote.i;

			length = Math.max(Math.round(x / 5 - position), 1);

			this.setState({
				currentNote: {
					length: length, position: position, i: i
				}
			});
		}
	}, {
		key: "setZone",
		value: function setZone(event) {
			var _svgCordinates3 = (0, _svgCordinates8.default)(this.target, event),
			    x = _svgCordinates3.x,
			    y = _svgCordinates3.y;

			var _state$selectZone = this.state.selectZone,
			    startX = _state$selectZone.startX,
			    startY = _state$selectZone.startY;

			var _sortNumbers = sortNumbers(startX, x),
			    _sortNumbers2 = _slicedToArray(_sortNumbers, 2),
			    x1 = _sortNumbers2[0],
			    x2 = _sortNumbers2[1];

			var _sortNumbers3 = sortNumbers(startY, y),
			    _sortNumbers4 = _slicedToArray(_sortNumbers3, 2),
			    y1 = _sortNumbers4[0],
			    y2 = _sortNumbers4[1];

			this.setState({
				selectZone: {
					startX: startX,
					startY: startY,
					x1: x1,
					y1: y1,
					x2: x2,
					y2: y2
				}
			});
		}
	}, {
		key: "moveNotes",
		value: function moveNotes(event) {
			var _svgCordinates4 = (0, _svgCordinates8.default)(this.target, event),
			    x = _svgCordinates4.x,
			    y = _svgCordinates4.y;

			var diff = Math.floor((x - this.state.moveStart.x) / 5);
			var noteDiff = Math.floor((y - this.state.moveStart.y) / 10);
			var selected = this.state.selected.map(function (e) {
				var oldI = e.oldI || e.i;
				var oldPosition = e.oldPosition || e.position;

				var position = oldPosition + diff;
				var i = oldI - noteDiff;
				return _extends({}, e, { position: position, oldPosition: oldPosition, i: i, oldI: oldI });
			});
			this.setState({ selected: selected });
		}
	}, {
		key: "resizeNotes",
		value: function resizeNotes(event) {
			var _svgCordinates5 = (0, _svgCordinates8.default)(this.target, event),
			    x = _svgCordinates5.x;

			var diff = Math.round((x - this.state.resizeStart.x) / 5);
			var selected = this.state.selected.map(function (e) {
				var oldLength = e.oldLength || e.length;
				var length = oldLength + diff;
				return _extends({}, e, { length: length, oldLength: oldLength });
			});
			this.setState({ selected: selected });
		}
	}, {
		key: "allNotes",
		value: function allNotes() {
			return [].concat(_toConsumableArray(this.state.selected), _toConsumableArray(this.state.notes));
		}
	}, {
		key: "getResetNotes",
		value: function getResetNotes() {
			var notes = this.allNotes().map(function (_ref4) {
				var i = _ref4.i,
				    position = _ref4.position,
				    length = _ref4.length;
				return { i: i, position: position, length: length };
			});

			this.setNewResetState(notes);
		}
	}, {
		key: "setNewResetState",
		value: function setNewResetState(notes) {
			this.refreshMidi(notes);
			this.setState({
				notes: notes,
				selected: []
			});
		}
	}, {
		key: "select",
		value: function select() {
			var _this2 = this;

			var selected = [],
			    notes = [];
			this.allNotes().forEach(function (note) {
				return isInArea(_this2.state.selectZone, note) ? selected.push(note) : notes.push(note);
			});
			this.setState({
				selected: selected,
				notes: notes
			});
		}
	}, {
		key: "deleteNote",
		value: function deleteNote(note) {
			var notes = this.allNotes().filter(function (arrayNote) {
				return arrayNote !== note;
			});
			this.refreshMidi(notes);
			this.setState({ notes: notes });
		}
	}, {
		key: "selectSingleNote",
		value: function selectSingleNote(note) {
			var notes = this.allNotes().filter(function (e) {
				return e !== note;
			});
			this.setState({
				notes: notes,
				selected: [note]
			});
		}
	}, {
		key: "setTime",
		value: function setTime(event) {
			var _svgCordinates6 = (0, _svgCordinates8.default)(this.target, event),
			    x = _svgCordinates6.x;

			var time = Math.floor(x / 5);
			this.props.setTime(time);
		}
	}, {
		key: "clearPoint",
		value: function clearPoint() {

			if (this.state.currentNote) {
				var notes = [].concat(_toConsumableArray(this.state.notes), [this.state.currentNote]);
				this.state.currentNote = null;
				this.setNewResetState(notes);
			}
			if (this.state.selectZone) {
				this.setState({ selectZone: null });
				this.select();
			}
			if (this.state.moveStart) {
				this.state.moveStart = null;
				this.getResetNotes();
			}
			if (this.state.resizeStart) {
				this.state.resizeStart = null;
				this.getResetNotes();
			}
		}
	}, {
		key: "mouseDown",
		value: function mouseDown(event) {
			if (this.props.actionType === "draw") {
				this.startCreatingNote(event);
			}
			if (this.props.actionType === "select") {
				this.startSelecting(event);
			}
		}
	}, {
		key: "render",
		value: function render() {
			var notestep = 10;
			var count = 4;
			var left = 20;
			var up = 20;
			var stageWidth = left + 10 * 4 * 4 * count;
			var state = this.props.currentState * notestep / 2;
			var stageHeigth = up + 360;
			return _react2.default.createElement(
				"svg",
				{
					viewBox: [-left, -up, stageWidth, stageHeigth].join(" "),
					width: stageWidth + "px",
					height: stageHeigth + 0 + "px",
					onMouseMove: this.levelMove,
					onTouchMove: this.levelMove,
					onMouseLeave: this.clearPoint,
					onTouchEnd: this.clearPoint,
					onMouseUp: this.clearPoint,
					style: {
						background: "#3c474a"
					}
				},
				_react2.default.createElement(_TimelinePattern2.default, null),
				_react2.default.createElement(_KeyboardPattern2.default, null),
				_react2.default.createElement(_KeysPattern2.default, null),
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
						mouseDown: this.props.actionType === "draw" ? this.deleteNote.bind(this) : this.selectSingleNote.bind(this)
					}),
					_react2.default.createElement(_Quarter2.default, {
						quard: this.state.selected,
						color: "#03A9F4",
						mouseDown: this.startMoveSelectedNotes.bind(this),
						resize: this.startResizeSelectedNotes.bind(this)
					}),
					this.state.currentNote ? _react2.default.createElement(_Quarter2.default, {
						quard: [this.state.currentNote]
					}) : null
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