"use strict";
exports.__esModule = true;
var cohet_js_1 = require("../models/cohet.js");
var cohets = new Array();
window.addEventListener('load', function (event) {
    var _a, _b, _c, _d, _e, _f;
    var aCorrer = document.getElementById("btCursa");
    var _loop_1 = function (i) {
        (_a = document.getElementById("rocket" + i)) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
            omplirFormulari(i);
        });
    };
    for (var i = 1; i < 7; i++) {
        _loop_1(i);
    }
    (_b = document.getElementById("btOK")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
        crearCohet();
    });
    (_c = document.getElementById("btCancelUp")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () {
        netejarFormulari();
    });
    (_d = document.getElementById("btCancel")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", function () {
        netejarFormulari();
    });
    (_e = document.getElementById("btCursa")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", function () {
        carregarCursa();
    });
    cohets = cohet_js_1.Cohet.deserialitzar();
    if (cohets.length > 0) {
        var magatzem = document.getElementById("magatzem");
        var _loop_2 = function (cohet) {
            magatzem.insertAdjacentHTML("beforeend", cohet.getInfo());
            (_f = document.getElementById("bt_" + cohet.codi)) === null || _f === void 0 ? void 0 : _f.addEventListener("click", function () {
                var objecte = document.getElementById(cohet.codi);
                var imatge = document.getElementById("img_" + cohet.codi);
                var petard = document.getElementById("petard");
                imatge.innerHTML = '<img src="./../assets/explosio.gif" alt="Explosió" width="80px" height="50px">';
                petard.play();
                setTimeout(function () {
                    objecte.remove();
                }, 1000);
                cohet_js_1.Cohet.eliminarCohet(cohet.codi, cohets);
                if (cohets.length === 0) {
                    aCorrer.disabled = true;
                }
                else {
                    aCorrer.disabled = false;
                }
            });
        };
        for (var _i = 0, cohets_1 = cohets; _i < cohets_1.length; _i++) {
            var cohet = cohets_1[_i];
            _loop_2(cohet);
        }
    }
    else {
        aCorrer.disabled = true;
    }
});
function omplirFormulari(numPropulsors) {
    var contingut = document.getElementById("propellers");
    var propFields = "";
    for (var i = 1; i <= numPropulsors; i++) {
        propFields += "\n            <div style=\"width: 100px; margin: auto\" class=\"form-group mt-2\">\n                <label for=\"prop" + i + "\" class=\"font-weight-bold\">Propulsor" + i + "</label>\n                <select class=\"form-control form-control-sm\" id=\"prop" + i + "\">\n                    <option value=\"10\">10</option>\n                    <option value=\"20\">20</option>\n                    <option value=\"30\">30</option>\n                    <option value=\"40\">40</option>\n                    <option value=\"50\">50</option>\n                    <option value=\"60\">60</option>\n                </select>\n            </div>\n        ";
    }
    contingut.innerHTML = propFields;
}
function crearCohet() {
    var _a;
    var magatzem = document.getElementById("magatzem");
    var aCorrer = document.getElementById("btCursa");
    var codi = document.getElementById("codi");
    var codiValue = codi.value.trim();
    var prop1 = document.getElementById("prop1");
    var prop2 = document.getElementById("prop2");
    var prop3 = document.getElementById("prop3");
    var prop4 = document.getElementById("prop4");
    var prop5 = document.getElementById("prop5");
    var prop6 = document.getElementById("prop6");
    var propulsors = new Array();
    var cohet;
    // S'elimina els errors d'una validació prèvia
    var errcodi = document.getElementById("errcodi");
    codi.classList.remove("is-invalid");
    errcodi.innerHTML = "";
    if (codiValue.length != 8) {
        codi.classList.add("is-invalid");
        errcodi.innerHTML = "El codi ha de tenir 8 caràcters";
        return;
    }
    // Es comprova que no existeixi un cohet amb el mateix codi
    if (cohet_js_1.Cohet.hasCohet(codiValue, cohets)) {
        codi.classList.add("is-invalid");
        errcodi.innerHTML = "Ja existeix un cohet amb aquest codi";
        return;
    }
    // Tot correcte, es crea el cohet.
    propulsors.push(Number(prop1.value));
    if (prop2 != null) {
        propulsors.push(Number(prop2.value));
    }
    if (prop3 != null) {
        propulsors.push(Number(prop3.value));
    }
    if (prop4 != null) {
        propulsors.push(Number(prop4.value));
    }
    if (prop5 != null) {
        propulsors.push(Number(prop5.value));
    }
    if (prop6 != null) {
        propulsors.push(Number(prop6.value));
    }
    cohet = new cohet_js_1.Cohet(codiValue, propulsors);
    cohets.push(cohet);
    magatzem.insertAdjacentHTML("beforeend", cohet.getInfo());
    aCorrer.disabled = false;
    (_a = document.getElementById("bt_" + cohet.codi)) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
        var objecte = document.getElementById(cohet.codi);
        var imatge = document.getElementById("img_" + cohet.codi);
        var petard = document.getElementById("petard");
        imatge.innerHTML = '<img src="./../assets/explosio.gif" alt="Explosió" width="80px" height="50px">';
        petard.play();
        setTimeout(function () {
            objecte.remove();
        }, 1000);
        cohet_js_1.Cohet.eliminarCohet(cohet.codi, cohets);
        if (cohets.length === 0) {
            aCorrer.disabled = true;
        }
    });
    netejarFormulari();
}
function netejarFormulari() {
    var codi = document.getElementById("codi");
    var prop1 = document.getElementById("prop1");
    var prop2 = document.getElementById("prop2");
    var prop3 = document.getElementById("prop3");
    var prop4 = document.getElementById("prop4");
    var prop5 = document.getElementById("prop5");
    var prop6 = document.getElementById("prop6");
    var errcodi = document.getElementById("errcodi");
    codi.classList.remove("is-invalid");
    errcodi.innerHTML = "";
    codi.value = "";
    prop1.value = "10";
    if (prop2 != null) {
        prop2.value = "10";
    }
    if (prop3 != null) {
        prop3.value = "10";
    }
    if (prop4 != null) {
        prop4.value = "10";
    }
    if (prop5 != null) {
        prop5.value = "10";
    }
    if (prop6 != null) {
        prop6.value = "10";
    }
}
function carregarCursa() {
    cohet_js_1.Cohet.serialitzar(cohets);
    window.open("./../views/cursa.html", "_self");
}
