"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequence = [[]];
var endIndex = sequence.length;
var arpIndex = 0;
function sequencer() {
    arpIndex = 0;
    return {
        next: function (notes) {
            var chord = [];
            var maxNotes = notes.size;
            var values = Array.from(notes).sort(function (a, b) { return a > b ? 1 : -1; });
            if (maxNotes) {
                chord = sequence[arpIndex].map(function (i) {
                    i--;
                    var octave = 12 * Math.floor(i / maxNotes);
                    var selectIndex = i % maxNotes;
                    return values[selectIndex] + octave;
                });
            }
            arpIndex++;
            if (arpIndex >= endIndex) {
                arpIndex = 0;
            }
            return chord;
        }
    };
}
var Sequencer = (function () {
    function Sequencer(initialSequence) {
        if (initialSequence === void 0) { initialSequence = [[]]; }
        var _this = this;
        this._steps = 2;
        this.nextState = function (main) {
            _this._chord.forEach(function (note) { return main.simpleUnset(note); });
            _this._chord = _this._sequenceTaskRunner.next(main.active);
            _this._chord.forEach(function (v) { return main.simpleSet(v); });
        };
        this.next = function (main) {
            if (_this.state >= _this._steps) {
                _this.nextState(main);
                _this.state = 0;
            }
            _this.state++;
        };
        this.setSequence = function (seq) {
            _this.sequence = seq;
            sequence = seq;
            endIndex = sequence.length;
        };
        this.restart = function () {
            arpIndex = 0;
        };
        this.state = 0;
        this.sequence = initialSequence;
        this._sequenceTaskRunner = sequencer();
        this._chord = [];
        sequence = initialSequence;
    }
    return Sequencer;
}());
exports.default = Sequencer;
