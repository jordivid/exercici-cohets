import { Cohet } from "../models/cohet.js";

const separacio = 100;
const altura: number = window.innerHeight;
const ample: number = window.innerWidth - 100;
const carrils: number = Math.round((altura - 50) / separacio) - 1;
let cohets: Cohet[] = new Array();
let raceArea: HTMLElement;
let numCohets: number;
let timer: any;

window.addEventListener("load", (event) => {
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

  cohets = Cohet.deserialitzar();
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
  document
    .getElementById("btAccelerar")
    ?.addEventListener("click", function () {
      accelerar();
    });
  document.getElementById("btFrenar")?.addEventListener("click", function () {
    frenar();
  });
});

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

function iniciCursa() {
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
  }

  timer = setInterval(function () {
    aCorrer();
  }, 50);
}

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

  btAccelerar.setAttribute("disabled", "true");
  btFrenar.setAttribute("disabled", "true");
  btAturar.setAttribute("disabled", "true");
  btIniciar.removeAttribute("disabled");

  for (let i: number = 0; i < numCohets && i < carrils; i++) {
    cohets[i].aturar();
    cohets[i].posY = 0;
    // cohets[i].posX = 135 + i * separacio;
    cohets[i].posX = 20 + i * separacio;
    cohet = <HTMLElement>document.getElementById(cohets[i].codi);
    cohet.style.left = `${cohets[i].posY}px`;
  }
}

function accelerar() {
  let codi: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("codi")
  );
  let cohet: Cohet | null = Cohet.getCohet(codi.value, cohets);

  if (typeof cohet != null) {
    cohet?.accelerar();
  }
}

function frenar() {
  let codi: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("codi")
  );
  let cohet: Cohet | null = Cohet.getCohet(codi.value, cohets);

  if (typeof cohet != null) {
    cohet?.frenar();
  }
}

function aCorrer(): void {
  let cohet: HTMLElement;

  for (let i: number = 0; i < numCohets && i < carrils; i++) {
    cohets[i].posY += Math.round(cohets[i].curpower / 5);
    if (cohets[i].posY > ample) {
        cohets[i].posY = -100;
    }
  }
  for (let i: number = 0; i < numCohets && i < carrils; i++) {
    cohet = <HTMLElement>document.getElementById(cohets[i].codi);
    cohet.style.left = `${cohets[i].posY}px`;
  }
}
