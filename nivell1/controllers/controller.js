"use strict";
exports.__esModule = true;
var cohet_js_1 = require("../models/cohet.js");
var cohet1;
var cohet2;
window.addEventListener('load', function (event) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    (_a = document.getElementById("btCrear1")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
        crearCohet(1);
    });
    (_b = document.getElementById("btCrear2")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
        crearCohet(2);
    });
    (_c = document.getElementById("btAccelerar1")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () {
        accelerarCohet(cohet1);
    });
    (_d = document.getElementById("btAccelerar2")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", function () {
        accelerarCohet(cohet2);
    });
    (_e = document.getElementById("btFrenar1")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", function () {
        frenarCohet(cohet1);
    });
    (_f = document.getElementById("btFrenar2")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", function () {
        frenarCohet(cohet2);
    });
    (_g = document.getElementById("btInfo1")) === null || _g === void 0 ? void 0 : _g.addEventListener("click", function () {
        infoCohet(cohet1);
    });
    (_h = document.getElementById("btInfo2")) === null || _h === void 0 ? void 0 : _h.addEventListener("click", function () {
        infoCohet(cohet2);
    });
    (_j = document.getElementById("btInfo0")) === null || _j === void 0 ? void 0 : _j.addEventListener("click", function () {
        infoAll();
    });
});
function crearCohet(numCohet) {
    switch (numCohet) {
        case 1:
            document.getElementById("btCrear1").disabled = true;
            document.getElementById("btAccelerar1").disabled = false;
            document.getElementById("btFrenar1").disabled = false;
            document.getElementById("btInfo1").disabled = false;
            document.getElementById("btInfo0").disabled = false;
            cohet1 = new cohet_js_1.Cohet("32WESSDS", [10, 30, 80]);
            break;
        case 2:
            document.getElementById("btCrear2").disabled = true;
            document.getElementById("btAccelerar2").disabled = false;
            document.getElementById("btFrenar2").disabled = false;
            document.getElementById("btInfo2").disabled = false;
            document.getElementById("btInfo0").disabled = false;
            cohet2 = new cohet_js_1.Cohet("LDSFJA32", [30, 40, 50, 50, 30, 10]);
            break;
    }
}
function accelerarCohet(cohet) {
    cohet.accelerar();
}
function frenarCohet(cohet) {
    cohet.frenar();
}
function infoAll() {
    var contingut = document.getElementById("content");
    var info = "";
    if (cohet1 != undefined) {
        info = cohet1.getInfo();
    }
    if (cohet2 != undefined) {
        if (info != "") {
            info += "<br>";
        }
        info += cohet2.getInfo();
    }
    contingut.innerHTML = info;
}
function infoCohet(cohet) {
    var info = cohet.getInfo();
    var contingut = document.getElementById("content");
    contingut.innerHTML = info;
}
