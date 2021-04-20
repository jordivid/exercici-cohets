import { Cohet } from "./cohet";
export class Competicio {
    constructor(cohets) {
        this._competidors = new Map();
        for (let cohet of cohets) {
            this._competidors.set(cohet, 0);
        }
        this._classificacio = new Array();
    }
    finalCompeticio() {
        if (this._competidors.size === this._classificacio.length) {
            Cohet.serialitzar(this.classificacio, "classificacio_cohets");
            return true;
        }
        else {
            return false;
        }
    }
    get classificacio() {
        return this._classificacio;
    }
    // Es retorna el nº de voltes que ha fet un cohet.
    getVoltes(codi) {
        let voltes = this._competidors.get(codi);
        if (typeof voltes != "undefined") {
            return voltes;
        }
        else {
            return 0;
        }
    }
    // Es passa un cohet i el nº de voltes que ha fet. Si ja ha finalitzat la cursa
    // es posa a l'array de classificació i es retorna true, en cas contrari
    // es retorna false.
    classificar(cohet) {
        let voltes = this._competidors.get(cohet.codi);
        if (typeof voltes != "undefined") {
            voltes++;
            this._competidors.set(cohet.codi, voltes);
            if (voltes === Competicio.VOLTES) {
                this._classificacio.push(cohet);
                return true;
            }
        }
        return false;
    }
}
Competicio.VOLTES = Number(sessionStorage.getItem("voltes_cursa"));
