import { Cohet } from "./cohet";

export class Competicio {
  public static VOLTES: number = Number(sessionStorage.getItem("voltes_cursa"));
  private _competidors: Map<string, number>;
  private _classificacio: Cohet[];

  constructor(cohets: string[]) {
    this._competidors = new Map();
    for (let cohet of cohets) {
      this._competidors.set(cohet, 0);
    }
    this._classificacio = new Array();
  }

  public finalCompeticio(): boolean {
    if (this._competidors.size === this._classificacio.length) {
      Cohet.serialitzar(this.classificacio, "classificacio_cohets");
      return true;
    } else {
      return false;
    }
  }

  public get classificacio(): Cohet[] {
    return this._classificacio;
  }

  // Es retorna el nº de voltes que ha fet un cohet.
  public getVoltes(codi: string): number {
    let voltes: number | undefined = this._competidors.get(codi);

    if (typeof voltes != "undefined") {
      return voltes;
    } else {
      return 0;
    }
  }

  // Es passa un cohet i el nº de voltes que ha fet. Si ja ha finalitzat la cursa
  // es posa a l'array de classificació i es retorna true, en cas contrari
  // es retorna false.
  public classificar(cohet: Cohet): boolean {
    let voltes: number | undefined = this._competidors.get(cohet.codi);

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
