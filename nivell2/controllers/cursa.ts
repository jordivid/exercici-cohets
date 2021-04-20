import { Cohet } from "../models/cohet.js";
import { Competicio } from "../models/competicio.js";

const separacio = 100;
const altura: number = window.innerHeight;
const ample: number = window.innerWidth - 100;
const carrils: number = Math.round((altura - 50) / separacio) - 1;
let competicio: Competicio = null;
let cohets: Cohet[] = new Array();
let raceArea: HTMLElement;
let numCohets: number;
let timer: any;

// Es crea l'àrea per la cursa i listeners per als elements interactius.
window.addEventListener("load", (event) => {
  let btAccelerar: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("btAccelerar")
  );
  let btFrenar: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("btFrenar")
  );
  let btAturar: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("btAturar")
  );
  let btTornar: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("btTornar")
  );

  cohets = Cohet.deserialitzar("llista_cohets");
  raceArea = <HTMLElement>document.getElementById("raceArea");
  setup();

  btAccelerar.setAttribute("disabled", "true");
  btFrenar.setAttribute("disabled", "true");
  btAturar.setAttribute("disabled", "true");

  document.getElementById("btIniciar")?.addEventListener("click", function () {
    iniciCursa();
  });
  document.getElementById("btAturar")?.addEventListener("click", function () {
    aturarCursa();
  });
  document.getElementById("btAccelerar")?.addEventListener("click", function () {
      accelerar();
  });
  document.getElementById("btFrenar")?.addEventListener("click", function () {
    frenar();
  });
  document.getElementById("btTornar")?.addEventListener("click", function () {
    tornar();
  });
});

// Es posiciona els cohets per la cursa.
function setup() {
  numCohets = cohets.length;
  let codi: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("codi")
  );
  let cohet: HTMLElement;
  let codiH: string = "";

  for (let i: number = 0; i < numCohets && i < carrils; i++) {
    codiH = `<option value="${cohets[i].codi}">${cohets[i].codi}</option>`;
    codi.insertAdjacentHTML("beforeend", codiH);

    cohets[i].posY = 0;
    cohets[i].posX = 50 + i * separacio;
    raceArea.insertAdjacentHTML("beforeend", cohets[i].codiCohet());
    cohet = <HTMLElement>document.getElementById(cohets[i].codi);
    cohet.style.top = `${cohets[i].posX}px`;
    cohet.style.left = `${cohets[i].posY}px`;
  }
}

// Engega la cursa. Tots els cohets comencen amb una potencia inicial de 10.
function iniciCursa() {
  let codisCohets: string[] = new Array();
  let btAccelerar: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("btAccelerar")
  );
  let btFrenar: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("btFrenar")
  );
  let btIniciar: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("btIniciar")
  );
  let btAturar: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("btAturar")
  );

  btAccelerar.removeAttribute("disabled");
  btFrenar.removeAttribute("disabled");
  btAturar.removeAttribute("disabled");
  btIniciar.setAttribute("disabled", "true");

  for (let i: number = 0; i < numCohets && i < carrils; i++) {
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
  let cohet: HTMLElement;

  let btAccelerar: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("btAccelerar")
  );
  let btFrenar: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("btFrenar")
  );
  let btIniciar: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("btIniciar")
  );
  let btAturar: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("btAturar")
  );

  clearInterval(timer);
  competicio = null;

  btAccelerar.setAttribute("disabled", "true");
  btFrenar.setAttribute("disabled", "true");
  btAturar.setAttribute("disabled", "true");
  btIniciar.removeAttribute("disabled");

  for (let i: number = 0; i < numCohets && i < carrils; i++) {
    cohets[i].aturar();
    cohets[i].posY = 0;
    cohets[i].posX = 20 + i * separacio;
    cohet = <HTMLElement>document.getElementById(cohets[i].codi);
    cohet.style.left = `${cohets[i].posY}px`;
  }
}

// Acceleració del cohet seleccionat.
function accelerar() {
  let codi: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("codi")
  );
  let cohet: Cohet | null = Cohet.getCohet(codi.value, cohets);

  if (typeof cohet != null) {
    cohet?.accelerar();
  }
}

// Es torna a la pantalla inicial. Primer s'atura la cursa si està activa.
function tornar() {
  let btIniciar: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("btIniciar")
  );

  if (btIniciar.disabled === true) {
    aturarCursa();
  };
  window.open("./../views/index.html", "_self");
}

// Frenada del cohet seleccionat.
function frenar() {
  let codi: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("codi")
  );
  let cohet: Cohet | null = Cohet.getCohet(codi.value, cohets);

  if (typeof cohet != null) {
    if (cohet.curpower > 10) {
      cohet?.frenar();
    }
  }
}

// Es recalcula la posició del cohets segons la potència i es reposicionen a l'àrea de cursa.
// Si un cohet ha finalitzat la cursa, s'atura a la posició inicial a l'espera que els altres
// finalitzin.
function aCorrer(): void {
  let cohet: HTMLElement;
  let classificat: boolean;

  for (let i: number = 0; i < numCohets && i < carrils; i++) {
    if (competicio.getVoltes(cohets[i].codi) < Competicio.VOLTES) {
      cohets[i].posY += Math.round(cohets[i].curpower / 5);
      // El cohet ha acabat una volta.
      if (cohets[i].posY > ample) {
          classificat = competicio.classificar(cohets[i]);
          // El cohet ha finalitzat la cursa
          if (classificat) {
            cohets[i].posY = 0;
          } else {
            cohets[i].posY = -100;
          }
      }
    }
  }

  for (let i: number = 0; i < numCohets && i < carrils; i++) {
    cohet = <HTMLElement>document.getElementById(cohets[i].codi);
    cohet.style.left = `${cohets[i].posY}px`;
  }

  if (competicio.finalCompeticio()) {
    aturarCursa();
    window.open("./../views/classificacio.html", "_self");
  }
}
