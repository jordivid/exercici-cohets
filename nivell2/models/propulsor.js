"use strict";
exports.__esModule = true;
exports.Propulsor = void 0;
var Propulsor = /** @class */ (function () {
    function Propulsor(maxpower) {
        this._maxpower = maxpower;
    }
    Object.defineProperty(Propulsor.prototype, "maxpower", {
        get: function () {
            return this._maxpower;
        },
        enumerable: false,
        configurable: true
    });
    return Propulsor;
}());
exports.Propulsor = Propulsor;
