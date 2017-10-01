"use strict";

var _EnvelopeParameter = require("../EnvelopeParameter");

var _EnvelopeParameter2 = _interopRequireDefault(_EnvelopeParameter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_EnvelopeParameter2.default.__Rewire__("sampleRate", 4);
describe("EnvelopeParameter : increase from 0 to 0.5", function () {

	var event = (0, _EnvelopeParameter2.default)(1, 0, 0.5);
	it("call > 1: must: 0.125 ", function () {
		var procent = event.next();
		expect(procent).to.deep.equal({ value: 0.125, done: false });
	});
	it("call > 2: must: 0.25 ", function () {
		var procent = event.next();
		expect(procent).to.deep.equal({ value: 0.25, done: false });
	});
	it("call > 3: must: 0.375 ", function () {
		var procent = event.next();
		expect(procent).to.deep.equal({ value: 0.375, done: false });
	});
	it("call > 4: must: 0.5 and Done ", function () {
		var procent = event.next();
		expect(procent).to.deep.equal({ value: 0.5, done: true });
	});
});

describe("EnvelopeParameter : Decrease from 1 to 0.5", function () {

	var event = (0, _EnvelopeParameter2.default)(1, 1, 0.5);
	it("call > 1: must: 0.875 ", function () {
		var procent = event.next();
		expect(procent).to.deep.equal({ value: 0.875, done: false });
	});
	it("call > 2: must: 0.75 ", function () {
		var procent = event.next();
		expect(procent).to.deep.equal({ value: 0.75, done: false });
	});
	it("call > 3: must: 0.625 ", function () {
		var procent = event.next();
		expect(procent).to.deep.equal({ value: 0.625, done: false });
	});
	it("call > 4: must: 0.5 and Done ", function () {
		var procent = event.next();
		expect(procent).to.deep.equal({ value: 0.5, done: true });
	});
});

describe("EnvelopeParameter : Decrease Main", function () {

	var event = (0, _EnvelopeParameter2.default)(1);
	it("call > 1: must: 0.75 ", function () {
		var procent = event.next();
		expect(procent).to.deep.equal({ value: 0.75, done: false });
	});
	it("call > 2: must: 0.5 ", function () {
		var procent = event.next();
		expect(procent).to.deep.equal({ value: 0.5, done: false });
	});
	it("call > 3: must: 0.25 ", function () {
		var procent = event.next();
		expect(procent).to.deep.equal({ value: 0.25, done: false });
	});
	it("call > 4: must: 0 and Done ", function () {
		var procent = event.next();
		expect(procent).to.deep.equal({ value: 0, done: true });
	});
});