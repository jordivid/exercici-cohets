"use strict";
exports.__esModule = true;
exports.Propulsor = void 0;
var Propulsor = /** @class */ (function () {
    // private _curpower: number;
    function Propulsor(maxpower) {
        this._maxpower = maxpower;
        // this._curpower = 0;
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
