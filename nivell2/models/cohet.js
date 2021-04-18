"use strict";
exports.__esModule = true;
exports.Cohet = void 0;
var propulsor_1 = require("./propulsor");
var Cohet = /** @class */ (function () {
    function Cohet(codi, props) {
        this._codi = codi;
        this._propulsors = new Array();
        this._curpower = 0;
        this._posX = 0;
        this._posY = 0;
        for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
            var propulsor = props_1[_i];
            this._propulsors.push(new propulsor_1.Propulsor(propulsor));
        }
    }
    Cohet.hasCohet = function (codi, cohets) {
        for (var _i = 0, cohets_1 = cohets; _i < cohets_1.length; _i++) {
            var cohet = cohets_1[_i];
            if (cohet.codi === codi) {
                return true;
            }
        }
        return false;
    };
    Cohet.getCohet = function (codi, cohets) {
        for (var _i = 0, cohets_2 = cohets; _i < cohets_2.length; _i++) {
            var cohet = cohets_2[_i];
            if (cohet.codi === codi) {
                return cohet;
            }
        }
        return null;
    };
    Cohet.eliminarCohet = function (codi, cohets) {
        for (var i = 0; i < cohets.length; i++) {
            if (cohets[i].codi === codi) {
                cohets.splice(i, 1);
                break;
            }
        }
    };
    Cohet.serialitzar = function (cohets) {
        sessionStorage.setItem("llista_cohets", JSON.stringify(cohets));
    };
    Cohet.deserialitzar = function () {
        var myProp = /** @class */ (function () {
            function myProp() {
                this._maxpower = 0;
            }
            return myProp;
        }());
        var myRocket = /** @class */ (function () {
            function myRocket() {
                this._codi = "";
                this._curpower = 0;
                this._propulsors = new Array();
            }
            return myRocket;
        }());
        var cohets = new Array();
        var guardats = sessionStorage.getItem("llista_cohets");
        if (typeof guardats === "string") {
            var rockets = JSON.parse(guardats);
            var rocket = void 0;
            for (var _i = 0, rockets_1 = rockets; _i < rockets_1.length; _i++) {
                rocket = rockets_1[_i];
                var props = new Array();
                for (var _a = 0, _b = rocket._propulsors; _a < _b.length; _a++) {
                    var prop = _b[_a];
                    props.push(prop._maxpower);
                }
                cohets.push(new Cohet(rocket._codi, props));
            }
        }
        return cohets;
    };
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
    Object.defineProperty(Cohet.prototype, "posX", {
        get: function () {
            return this._posX;
        },
        set: function (x) {
            this._posX = x;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cohet.prototype, "posY", {
        get: function () {
            return this._posY;
        },
        set: function (y) {
            this._posY = y;
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
    Cohet.prototype.getImage = function () {
        return "rocket" + this.propulsors.length + ".png";
    };
    Cohet.prototype.getInfo = function () {
        var row = "";
        var count = 0;
        row += "\n            <tr id=\"" + this.codi + "\">\n            <td><button id=\"bt_" + this.codi + "\" type=\"button\" class=\"btn btn-sm btn-danger\">X</button></td>\n            <td id=\"img_" + this.codi + "\" class=\"p-1 d-flex flex-column align-items-center\">\n                <img src=\"./../assets/" + this.getImage() + "\" alt=\"Cohet\" width=\"80px\" height=\"auto\">\n                <span style=\"font-size: 10px\">" + this.codi + "</span>\n            </td>\n        ";
        for (var _i = 0, _a = this.propulsors; _i < _a.length; _i++) {
            var propulsor = _a[_i];
            count++;
            row += "\n                <td class=\"text-center\">" + propulsor.maxpower + "</td>\n            ";
        }
        if (count < 6) {
            for (var i = count; i < 6; i++) {
                row += "<td></td>";
            }
        }
        row += "</tr>";
        return row;
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
    Cohet.prototype.aturar = function () {
        this.curpower = 0;
    };
    Cohet.prototype.codiCohet = function () {
        var codi = "\n            <div id=\"" + this.codi + "\" style=\"display: inline-block; z-index: 100; position: absolute; top: -100px; left: -100px\">\n                <img src=\"./../assets/" + this.getImage() + "\" alt=\"" + this.codi + "\">\n            </div>\n        ";
        return codi;
    };
    Cohet.ACC_FACTOR = 10; // Factor d'acceleració
    Cohet.DEC_FACTOR = 10; // Factor de frenada
    return Cohet;
}());
exports.Cohet = Cohet;
