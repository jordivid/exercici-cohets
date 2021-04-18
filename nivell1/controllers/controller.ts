import { Cohet } from "../models/cohet.js";

let cohet1: Cohet;
let cohet2: Cohet;

window.addEventListener('load', (event) => {
    document.getElementById("btCrear1")?.addEventListener("click", function() {
        crearCohet(1);
    });
    document.getElementById("btCrear2")?.addEventListener("click", function() {
        crearCohet(2);
    });
    document.getElementById("btAccelerar1")?.addEventListener("click", function() {
        accelerarCohet(cohet1);
    });
    document.getElementById("btAccelerar2")?.addEventListener("click", function() {
        accelerarCohet(cohet2);
    });
    document.getElementById("btFrenar1")?.addEventListener("click", function() {
        frenarCohet(cohet1);
    });
    document.getElementById("btFrenar2")?.addEventListener("click", function() {
        frenarCohet(cohet2);
    });
    document.getElementById("btInfo1")?.addEventListener("click", function() {
        infoCohet(cohet1);
    });
    document.getElementById("btInfo2")?.addEventListener("click", function() {
        infoCohet(cohet2);
    });
    document.getElementById("btInfo0")?.addEventListener("click", function() {
        infoAll();
    });
});

function crearCohet(numCohet: number): void {
    switch (numCohet) {
        case 1:
            (<HTMLInputElement>document.getElementById("btCrear1")).disabled = true;
            (<HTMLInputElement>document.getElementById("btAccelerar1")).disabled = false;
            (<HTMLInputElement>document.getElementById("btFrenar1")).disabled = false;
            (<HTMLInputElement>document.getElementById("btInfo1")).disabled = false;
            (<HTMLInputElement>document.getElementById("btInfo0")).disabled = false;
            cohet1 = new Cohet("32WESSDS", [10, 30, 80]);
            break;
        case 2:
            (<HTMLInputElement>document.getElementById("btCrear2")).disabled = true;
            (<HTMLInputElement>document.getElementById("btAccelerar2")).disabled = false;
            (<HTMLInputElement>document.getElementById("btFrenar2")).disabled = false;
            (<HTMLInputElement>document.getElementById("btInfo2")).disabled = false;
            (<HTMLInputElement>document.getElementById("btInfo0")).disabled = false;
            cohet2 =new Cohet("LDSFJA32", [30, 40, 50, 50, 30, 10]);
            break;
    }
}

function accelerarCohet(cohet: Cohet) : void {
    cohet.accelerar();
}

function frenarCohet(cohet: Cohet) : void {
    cohet.frenar();
}

function infoAll() : void {
    let contingut: HTMLElement = (<HTMLElement>document.getElementById("content"));
    let info: string = "";

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

function infoCohet(cohet: Cohet) : void {
    let info: string = cohet.getInfo();
    let contingut: HTMLElement = (<HTMLElement>document.getElementById("content"));

    contingut.innerHTML = info;
}
