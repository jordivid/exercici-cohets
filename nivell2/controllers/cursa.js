import { Cohet } from "../models/cohet.js";
import { Competicio } from "../models/competicio.js";
const separacio = 100;
const altura = window.innerHeight;
const ample = window.innerWidth - 100;
const carrils = Math.round((altura - 50) / separacio) - 1;
let competicio = null;
let cohets = new Array();
let raceArea;
let numCohets;
let timer;
// Es crea l'àrea per la cursa i listeners per als elements interactius.
window.addEventListener("load", (event) => {
    var _a, _b, _c, _d, _e;
    let btAccelerar = (document.getElementById("btAccelerar"));
    let btFrenar = (document.getElementById("btFrenar"));
    let btAturar = (document.getElementById("btAturar"));
    let btTornar = (document.getElementById("btTornar"));
    cohets = Cohet.deserialitzar("llista_cohets");
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
    (_c = document.getElementById("btAccelerar")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () {
        accelerar();
    });
    (_d = document.getElementById("btFrenar")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", function () {
        frenar();
    });
    (_e = document.getElementById("btTornar")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", function () {
        tornar();
    });
});
// Es posiciona els cohets per la cursa.
function setup() {
    numCohets = cohets.length;
    let codi = (document.getElementById("codi"));
    let cohet;
    let codiH = "";
    for (let i = 0; i < numCohets && i < carrils; i++) {
        codiH = `<option value="${cohets[i].codi}">${cohets[i].codi}</option>`;
        codi.insertAdjacentHTML("beforeend", codiH);
        cohets[i].posY = 0;
        cohets[i].posX = 50 + i * separacio;
        raceArea.insertAdjacentHTML("beforeend", cohets[i].codiCohet());
        cohet = document.getElementById(cohets[i].codi);
        cohet.style.top = `${cohets[i].posX}px`;
        cohet.style.left = `${cohets[i].posY}px`;
    }
}
// Engega la cursa. Tots els cohets comencen amb una potencia inicial de 10.
function iniciCursa() {
    let codisCohets = new Array();
    let btAccelerar = (document.getElementById("btAccelerar"));
    let btFrenar = (document.getElementById("btFrenar"));
    let btIniciar = (document.getElementById("btIniciar"));
    let btAturar = (document.getElementById("btAturar"));
    btAccelerar.removeAttribute("disabled");
    btFrenar.removeAttribute("disabled");
    btAturar.removeAttribute("disabled");
    btIniciar.setAttribute("disabled", "true");
    for (let i = 0; i < numCohets && i < carrils; i++) {
        cohets[i].accelerar();
        codisCohets.push(cohets[i].codi);
    }
    competicio = new Competicio(codisCohets);
    // A intèrvals regulars s'actualitzarà la posició dels cohets.
    timer = setInterval(function () {
        aCorrer();
    }, 50);
}
// S'atura la cursa. Els cohets tornen a la sortida.
function aturarCursa() {
    let cohet;
    let btAccelerar = (document.getElementById("btAccelerar"));
    let btFrenar = (document.getElementById("btFrenar"));
    let btIniciar = (document.getElementById("btIniciar"));
    let btAturar = (document.getElementById("btAturar"));
    clearInterval(timer);
    competicio = null;
    btAccelerar.setAttribute("disabled", "true");
    btFrenar.setAttribute("disabled", "true");
    btAturar.setAttribute("disabled", "true");
    btIniciar.removeAttribute("disabled");
    for (let i = 0; i < numCohets && i < carrils; i++) {
        cohets[i].aturar();
        cohets[i].posY = 0;
        cohets[i].posX = 20 + i * separacio;
        cohet = document.getElementById(cohets[i].codi);
        cohet.style.left = `${cohets[i].posY}px`;
    }
}
// Acceleració del cohet seleccionat.
function accelerar() {
    let codi = (document.getElementById("codi"));
    let cohet = Cohet.getCohet(codi.value, cohets);
    if (typeof cohet != null) {
        cohet === null || cohet === void 0 ? void 0 : cohet.accelerar();
    }
}
// Es torna a la pantalla inicial. Primer s'atura la cursa si està activa.
function tornar() {
    let btIniciar = (document.getElementById("btIniciar"));
    if (btIniciar.disabled === true) {
        aturarCursa();
    }
    ;
    window.open("./../views/index.html", "_self");
}
// Frenada del cohet seleccionat.
function frenar() {
    let codi = (document.getElementById("codi"));
    let cohet = Cohet.getCohet(codi.value, cohets);
    if (typeof cohet != null) {
        if (cohet.curpower > 10) {
            cohet === null || cohet === void 0 ? void 0 : cohet.frenar();
        }
    }
}
// Es recalcula la posició del cohets segons la potència i es reposicionen a l'àrea de cursa.
// Si un cohet ha finalitzat la cursa, s'atura a la posició inicial a l'espera que els altres
// finalitzin.
function aCorrer() {
    let cohet;
    let classificat;
    for (let i = 0; i < numCohets && i < carrils; i++) {
        if (competicio.getVoltes(cohets[i].codi) < Competicio.VOLTES) {
            cohets[i].posY += Math.round(cohets[i].curpower / 5);
            // El cohet ha acabat una volta.
            if (cohets[i].posY > ample) {
                classificat = competicio.classificar(cohets[i]);
                // El cohet ha finalitzat la cursa
                if (classificat) {
                    cohets[i].posY = 0;
                }
                else {
                    cohets[i].posY = -100;
                }
            }
        }
    }
    for (let i = 0; i < numCohets && i < carrils; i++) {
        cohet = document.getElementById(cohets[i].codi);
        cohet.style.left = `${cohets[i].posY}px`;
    }
    if (competicio.finalCompeticio()) {
        aturarCursa();
        window.open("./../views/classificacio.html", "_self");
    }
}
