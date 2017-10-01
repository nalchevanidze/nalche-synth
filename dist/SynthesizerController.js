"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = SynthPad;

var _oscillator = require("./oscillator");

var _oscillator2 = _interopRequireDefault(_oscillator);

var _Context = require("./Context");

var _Context2 = _interopRequireDefault(_Context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nodes = [];

function FreeNodes() {
	return nodes.filter(function (node) {
		return !node.isActive();
	});
}

function freeOscilator() {
	var free_nodes = FreeNodes();
	if (free_nodes.length < 1) {
		var new_node = (0, _oscillator2.default)(_Context2.default);
		nodes.push(new_node);
		return new_node;
	}
	return free_nodes[0];
}

function MyOSC(note) {
	var Oscilator = freeOscilator();
	Oscilator.start({
		note: note
	});
	return Oscilator;
}

function SynthPad() {
	var notes = {};

	function play(value) {
		if (!notes[value]) {
			notes[value] = MyOSC(value);
		}
	}

	function stop(value) {
		if (notes[value]) {
			notes[value].end();
			delete notes[value];
		}
	}

	function stopAll() {
		Object.keys(notes).forEach(function (note) {
			stop(note);
		});
	}

	return {
		play: play,
		stop: stop,
		stopAll: stopAll
	};
}