"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequence = [
    [1, 2, 3],
    [],
    [],
    [1, 2, 3],
    [],
    [],
    [1, 2, 3],
    [],
    [1, 2, 3],
    [],
    [1],
    [2],
    [3],
    [2],
    [],
    []
];
var arpIndex = 0;
function sequencer() {
    arpIndex = 0;
    var endIndex = sequence.length;
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
var oldChord = [];
var seq = sequencer();
var steps = 2;
var Sequencer = (function () {
    function Sequencer() {
        var _this = this;
        this.next = function (main) {
            if (_this.state >= steps) {
                var chord = seq.next(main.active);
                oldChord.forEach(function (v) { return main.simpleUnset(v); });
                chord.forEach(function (v) { return main.simpleSet(v); });
                oldChord = chord;
                _this.state = 0;
            }
            _this.state++;
        };
        this.setSequence = function (seq) {
            _this.sequence = seq;
            sequence = seq;
        };
        this.restart = function () {
            arpIndex = 0;
        };
        this.state = 0;
    }
    return Sequencer;
}());
exports.default = Sequencer;
