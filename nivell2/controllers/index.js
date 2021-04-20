import { Cohet } from "../models/cohet.js";
let cohets = new Array();
// S'estableix els listeners per als elements interactius i es restaura l'arrat
// de cohets en cas de tenir-los guardats a sessionStorage.
window.addEventListener('load', (event) => {
    var _a, _b, _c, _d, _e, _f, _g;
    let aCorrer = document.getElementById("btCursa");
    for (let i = 1; i < 7; i++) {
        (_a = document.getElementById("rocket" + i)) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
            omplirFormulari(i);
        });
    }
    (_b = document.getElementById("btNuke")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
        fulminarTot();
    });
    (_c = document.getElementById("btOK")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () {
        crearCohet();
    });
    (_d = document.getElementById("btCancelUp")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", function () {
        netejarFormulari();
    });
    (_e = document.getElementById("btCancel")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", function () {
        netejarFormulari();
    });
    (_f = document.getElementById("btCursa")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", function () {
        carregarCursa();
    });
    cohets = Cohet.deserialitzar("llista_cohets");
    if (cohets.length > 0) {
        let magatzem = document.getElementById("magatzem");
        for (let cohet of cohets) {
            magatzem.insertAdjacentHTML("beforeend", cohet.getInfo());
            (_g = document.getElementById("bt_" + cohet.codi)) === null || _g === void 0 ? void 0 : _g.addEventListener("click", function () {
                let objecte = document.getElementById(cohet.codi);
                let imatge = document.getElementById("img_" + cohet.codi);
                let petard = document.getElementById("petard");
                imatge.innerHTML = '<img src="./../assets/explosio.gif" alt="Explosió" width="80px" height="50px">';
                petard.play();
                setTimeout(function () {
                    objecte.remove();
                }, 1000);
                Cohet.eliminarCohet(cohet.codi, cohets);
                if (cohets.length === 0) {
                    aCorrer.disabled = true;
                }
                else {
                    aCorrer.disabled = false;
                }
            });
        }
    }
    else {
        aCorrer.disabled = true;
    }
});
// Es genera el formulari de fabricació de cohets
function omplirFormulari(numPropulsors) {
    let contingut = document.getElementById("propellers");
    let propFields = "";
    for (let i = 1; i <= numPropulsors; i++) {
        propFields += `
            <div style="width: 100px; margin: auto" class="form-group mt-2">
                <label for="prop${i}" class="font-weight-bold">Propulsor${i}</label>
                <select class="form-control form-control-sm" id="prop${i}">
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                    <option value="50">50</option>
                    <option value="60">60</option>
                </select>
            </div>
        `;
    }
    contingut.innerHTML = propFields;
}
// Creació d'un cohets. Es valida que el codi sigui únic, s'afegeix a taula i es crea
// un listener per a la seva eventual eliminació.
function crearCohet() {
    var _a;
    let magatzem = document.getElementById("magatzem");
    let aCorrer = document.getElementById("btCursa");
    let voltes = document.getElementById("voltes");
    let codi = document.getElementById("codi");
    let codiValue = codi.value.trim();
    let prop1 = document.getElementById("prop1");
    let prop2 = document.getElementById("prop2");
    let prop3 = document.getElementById("prop3");
    let prop4 = document.getElementById("prop4");
    let prop5 = document.getElementById("prop5");
    let prop6 = document.getElementById("prop6");
    let propulsors = new Array();
    let cohet;
    // S'elimina els errors d'una validació prèvia
    let errcodi = document.getElementById("errcodi");
    let errvoltes = document.getElementById("errvoltes");
    codi.classList.remove("is-invalid");
    voltes.classList.remove("is-invalid");
    errcodi.innerHTML = "";
    errvoltes.innerHTML = "";
    if (codiValue.length != 8) {
        codi.classList.add("is-invalid");
        errcodi.innerHTML = "El codi ha de tenir 8 caràcters";
        return;
    }
    // Es comprova que no existeixi un cohet amb el mateix codi
    if (Cohet.hasCohet(codiValue, cohets)) {
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
    cohet = new Cohet(codiValue, propulsors);
    cohets.push(cohet);
    magatzem.insertAdjacentHTML("beforeend", cohet.getInfo());
    aCorrer.disabled = false;
    (_a = document.getElementById("bt_" + cohet.codi)) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
        let objecte = document.getElementById(cohet.codi);
        let imatge = document.getElementById("img_" + cohet.codi);
        let petard = document.getElementById("petard");
        imatge.innerHTML = '<img src="./../assets/explosio.gif" alt="Explosió" width="80px" height="50px">';
        petard.play();
        setTimeout(function () {
            objecte.remove();
        }, 1000);
        Cohet.eliminarCohet(cohet.codi, cohets);
        if (cohets.length === 0) {
            aCorrer.disabled = true;
        }
    });
    Cohet.serialitzar(cohets, "llista_cohets");
    netejarFormulari();
}
// Inicialització del formulari de fabricació de cohets.
function netejarFormulari() {
    let codi = document.getElementById("codi");
    let prop1 = document.getElementById("prop1");
    let prop2 = document.getElementById("prop2");
    let prop3 = document.getElementById("prop3");
    let prop4 = document.getElementById("prop4");
    let prop5 = document.getElementById("prop5");
    let prop6 = document.getElementById("prop6");
    let errcodi = document.getElementById("errcodi");
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
// Es carrega la pantalla de la cursa de cohets, sempre que s'hagi indicat un nº de voltes.
function carregarCursa() {
    let voltes = document.getElementById("voltes");
    let errvoltes = document.getElementById("errvoltes");
    let numvoltes;
    // S'elimina l'error d'una validació prèvia
    voltes.classList.remove("is-invalid");
    errvoltes.innerHTML = "";
    numvoltes = Math.floor(Number(voltes.value));
    if (!(numvoltes > 0) || numvoltes > 20) {
        voltes.classList.add("is-invalid");
        errvoltes.innerHTML = "Introduïr entre 1 i 20 voltes";
        return;
    }
    sessionStorage.setItem("voltes_cursa", numvoltes.toString());
    window.open("./../views/cursa.html", "_self");
}
// S'elimina tots els cohets fabricats
function fulminarTot() {
    let magatzem = document.getElementById("magatzem");
    let taula = document.getElementById("contenidorTaula");
    let petard = document.getElementById("granpetard");
    let contingut;
    console.log(cohets.length);
    if (cohets.length > 0) {
        cohets = new Array();
        sessionStorage.removeItem("llista_cohets");
        magatzem.innerHTML = "";
        contingut = taula.innerHTML;
        taula.innerHTML = "<img src='./../assets/granexplosio.png' alt='Explosió' width='50%' height='auto' style='margin-left: 25%'>";
        petard.play();
        setTimeout(function () {
            var _a;
            taula.innerHTML = contingut;
            (_a = document.getElementById("btNuke")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
                fulminarTot();
            });
        }, 4000);
    }
}
