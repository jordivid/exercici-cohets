import { Cohet } from "../models/cohet.js";

let cohets: Cohet[] = new Array();

window.addEventListener("load", (event) => {
  let btTornar: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("btTornar")
  );

  cohets = Cohet.deserialitzar("classificacio_cohets");
  setup();

  document.getElementById("btTornar")?.addEventListener("click", function () {
    window.open("./../views/index.html", "_self");
  });
});

function setup(): void {
  let classificacio: HTMLElement = <HTMLElement>document.getElementById("classificacio");
  let ordre: number = 0;

  for (let cohet of cohets) {
    ++ordre;
    classificacio.insertAdjacentHTML("beforeend", cohet.classified(ordre));
  }
}
