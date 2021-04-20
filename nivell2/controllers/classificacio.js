import { Cohet } from "../models/cohet.js";
let cohets = new Array();
window.addEventListener("load", (event) => {
    var _a;
    let btTornar = (document.getElementById("btTornar"));
    cohets = Cohet.deserialitzar("classificacio_cohets");
    setup();
    (_a = document.getElementById("btTornar")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
        window.open("./../views/index.html", "_self");
    });
});
function setup() {
    let classificacio = document.getElementById("classificacio");
    let ordre = 0;
    for (let cohet of cohets) {
        ++ordre;
        classificacio.insertAdjacentHTML("beforeend", cohet.classified(ordre));
    }
}
