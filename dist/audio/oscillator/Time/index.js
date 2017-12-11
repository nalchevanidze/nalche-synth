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
Object.defineProperty(exports, "__esModule", { value: true });
var sequencer_1 = require("../../sequencer");
var Tempo_1 = require("./Tempo");
var TaskQueue_1 = require("./TaskQueue");
var Time = (function (_super) {
    __extends(Time, _super);
    function Time(main) {
        var _this = _super.call(this, main) || this;
        _this.next = function () {
            if (_this.tempo.next()) {
                if (_this.main.isPlayng) {
                    _this.nextTask();
                }
                _this.runSequencer();
            }
        };
        _this.sequencer = new sequencer_1.default();
        _this.tempo = new Tempo_1.default();
        return _this;
    }
    Time.prototype.runSequencer = function () {
        if (this.main.seq.on) {
            this.sequencer.next(this.main);
        }
    };
    return Time;
}(TaskQueue_1.default));
exports.default = Time;
