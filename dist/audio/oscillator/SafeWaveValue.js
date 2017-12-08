"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function SafeWaveValue(value) {
    return Math.min(Math.max(Number.isNaN(value) ? 0 : value, -1), 1);
}
exports.default = SafeWaveValue;
