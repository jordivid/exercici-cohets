"use strict";
exports.__esModule = true;
exports.Cohet = void 0;
var propulsor_1 = require("./propulsor");
var Cohet = /** @class */ (function () {
    function Cohet(codi, props) {
        this._codi = codi;
        this._propulsors = new Array();
        this._curpower = 0;
        for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
            var propulsor = props_1[_i];
            this._propulsors.push(new propulsor_1.Propulsor(propulsor));
        }
    }
    Object.defineProperty(Cohet.prototype, "codi", {
        get: function () {
            return this._codi;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cohet.prototype, "propulsors", {
        get: function () {
            return this._propulsors;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cohet.prototype, "curpower", {
        get: function () {
            return this._curpower;
        },
        set: function (power) {
            this._curpower = power;
        },
        enumerable: false,
        configurable: true
    });
    Cohet.prototype.getMaxPower = function () {
        var maxpower = 0;
        for (var _i = 0, _a = this.propulsors; _i < _a.length; _i++) {
            var propulsor = _a[_i];
            maxpower += propulsor.maxpower;
        }
        return maxpower;
    };
    Cohet.prototype.getInfo = function () {
        var info = "Cohet: " + this.codi + "; Propulsors: ";
        var first = true;
        for (var _i = 0, _a = this.propulsors; _i < _a.length; _i++) {
            var propulsor = _a[_i];
            if (!first) {
                info += ", ";
            }
            first = false;
            info += propulsor.maxpower;
        }
        info += "; Potència actual: " + this.curpower;
        return info;
    };
    Cohet.prototype.accelerar = function () {
        var maxpower = this.getMaxPower();
        var curpower = this.curpower;
        if (curpower === maxpower) {
            return false;
        }
        curpower += Cohet.ACC_FACTOR;
        if (curpower > maxpower) {
            curpower = maxpower;
        }
        this.curpower = curpower;
        return true;
    };
    Cohet.prototype.frenar = function () {
        var curpower = this.curpower;
        if (curpower === 0) {
            return false;
        }
        curpower -= Cohet.DEC_FACTOR;
        if (curpower < 0) {
            curpower = 0;
        }
        this.curpower = curpower;
        return true;
    };
    Cohet.ACC_FACTOR = 10; // Factor d'acceleració
    Cohet.DEC_FACTOR = 10; // Factor de frenada
    return Cohet;
}());
exports.Cohet = Cohet;
