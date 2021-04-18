"use strict";
exports.__esModule = true;
var cohet_js_1 = require("../models/cohet.js");
var separacio = 100;
var altura = window.innerHeight;
var ample = window.innerWidth - 100;
var carrils = Math.round((altura - 50) / separacio) - 1;
var cohets = new Array();
var raceArea;
var numCohets;
var timer;
window.addEventListener("load", function (event) {
    var _a, _b, _c, _d;
    var btAccelerar = (document.getElementById("btAccelerar"));
    var btFrenar = (document.getElementById("btFrenar"));
    var btIniciar = (document.getElementById("btIniciar"));
    var btAturar = (document.getElementById("btAturar"));
    cohets = cohet_js_1.Cohet.deserialitzar();
    raceArea = document.getElementById("raceArea");
    setup();
    btAccelerar.setAttribute("disabled", "true");
    btFrenar.setAttribute("disabled", "true");
    btAturar.setAttribute("disabled", "true");
    (_a = document.getElementById("btIniciar")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
        iniciCursa();
    });
    (_b = document.getElementById("btAturar")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
        aturarCursa();
    });
    (_c = document
        .getElementById("btAccelerar")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () {
        accelerar();
    });
    (_d = document.getElementById("btFrenar")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", function () {
        frenar();
    });
});
function setup() {
    numCohets = cohets.length;
    var codi = (document.getElementById("codi"));
    var cohet;
    var codiH = "";
    for (var i = 0; i < numCohets && i < carrils; i++) {
        codiH = "<option value=\"" + cohets[i].codi + "\">" + cohets[i].codi + "</option>";
        codi.insertAdjacentHTML("beforeend", codiH);
        cohets[i].posY = 0;
        cohets[i].posX = 50 + i * separacio;
        raceArea.insertAdjacentHTML("beforeend", cohets[i].codiCohet());
        cohet = document.getElementById(cohets[i].codi);
        cohet.style.top = cohets[i].posX + "px";
        cohet.style.left = cohets[i].posY + "px";
    }
}
function iniciCursa() {
    var btAccelerar = (document.getElementById("btAccelerar"));
    var btFrenar = (document.getElementById("btFrenar"));
    var btIniciar = (document.getElementById("btIniciar"));
    var btAturar = (document.getElementById("btAturar"));
    btAccelerar.removeAttribute("disabled");
    btFrenar.removeAttribute("disabled");
    btAturar.removeAttribute("disabled");
    btIniciar.setAttribute("disabled", "true");
    for (var i = 0; i < numCohets && i < carrils; i++) {
        cohets[i].accelerar();
    }
    timer = setInterval(function () {
        aCorrer();
    }, 50);
}
function aturarCursa() {
    var cohet;
    var btAccelerar = (document.getElementById("btAccelerar"));
    var btFrenar = (document.getElementById("btFrenar"));
    var btIniciar = (document.getElementById("btIniciar"));
    var btAturar = (document.getElementById("btAturar"));
    clearInterval(timer);
    btAccelerar.setAttribute("disabled", "true");
    btFrenar.setAttribute("disabled", "true");
    btAturar.setAttribute("disabled", "true");
    btIniciar.removeAttribute("disabled");
    for (var i = 0; i < numCohets && i < carrils; i++) {
        cohets[i].aturar();
        cohets[i].posY = 0;
        // cohets[i].posX = 135 + i * separacio;
        cohets[i].posX = 20 + i * separacio;
        cohet = document.getElementById(cohets[i].codi);
        cohet.style.left = cohets[i].posY + "px";
    }
}
function accelerar() {
    var codi = (document.getElementById("codi"));
    var cohet = cohet_js_1.Cohet.getCohet(codi.value, cohets);
    if (typeof cohet != null) {
        cohet === null || cohet === void 0 ? void 0 : cohet.accelerar();
    }
}
function frenar() {
    var codi = (document.getElementById("codi"));
    var cohet = cohet_js_1.Cohet.getCohet(codi.value, cohets);
    if (typeof cohet != null) {
        cohet === null || cohet === void 0 ? void 0 : cohet.frenar();
    }
}
function aCorrer() {
    var cohet;
    for (var i = 0; i < numCohets && i < carrils; i++) {
        cohets[i].posY += Math.round(cohets[i].curpower / 5);
        if (cohets[i].posY > ample) {
            cohets[i].posY = -100;
        }
    }
    for (var i = 0; i < numCohets && i < carrils; i++) {
        cohet = document.getElementById(cohets[i].codi);
        cohet.style.left = cohets[i].posY + "px";
    }
}
