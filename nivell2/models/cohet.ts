import { Propulsor } from "./propulsor";

export class Cohet {
  private _codi: string;
  private _propulsors: Propulsor[];
  private _curpower: number;
  private _posX: number;
  private _posY: number;
  public static ACC_FACTOR: number = 10; // Factor d'acceleració
  public static DEC_FACTOR: number = 10; // Factor de frenada

  constructor(codi: string, props: number[]) {
    this._codi = codi;
    this._propulsors = new Array();
    this._curpower = 0;
    this._posX = 0;
    this._posY = 0;

    for (let propulsor of props) {
      this._propulsors.push(new Propulsor(propulsor));
    }
  }

  public static hasCohet(codi: string, cohets: Cohet[]): boolean {
    for (let cohet of cohets) {
      if (cohet.codi === codi) {
        return true;
      }
    }

    return false;
  }

  public static getCohet(codi: string, cohets: Cohet[]): Cohet | null {
    for (let cohet of cohets) {
      if (cohet.codi === codi) {
        return cohet;
      }
    }

    return null;
  }

  public static eliminarCohet(codi: string, cohets: Cohet[]): void {
    for (let i: number = 0; i < cohets.length; i++) {
      if (cohets[i].codi === codi) {
        cohets.splice(i, 1);
        break;
      }
    }
  }

  public static serialitzar(cohets: Cohet[]): void {
    sessionStorage.setItem("llista_cohets", JSON.stringify(cohets));
  }

  public static deserialitzar(): Cohet[] {
    class myProp {
      _maxpower: number = 0;
    }

    class myRocket {
      _codi: string = "";
      _curpower: number = 0;
      _propulsors: myProp[] = new Array();
    }

    let cohets: Cohet[] = new Array();
    let guardats: string | null = sessionStorage.getItem("llista_cohets");

    if (typeof guardats === "string") {
      let rockets = JSON.parse(guardats);
      let rocket: myRocket;

      for (rocket of rockets) {
        let props: number[] = new Array();
        for (let prop of rocket._propulsors) {
          props.push(prop._maxpower);
        }
        cohets.push(new Cohet(rocket._codi, props));
      }
    }

    return cohets;
  }

  public get codi(): string {
    return this._codi;
  }

  public get propulsors(): Propulsor[] {
    return this._propulsors;
  }

  public get curpower(): number {
    return this._curpower;
  }

  public get posX(): number {
    return this._posX;
  }

  public get posY(): number {
    return this._posY;
  }

  public set curpower(power: number) {
    this._curpower = power;
  }

  public set posX(x: number) {
    this._posX = x;
  }

  public set posY(y: number) {
    this._posY = y;
  }

  public getMaxPower(): number {
    let maxpower: number = 0;

    for (let propulsor of this.propulsors) {
      maxpower += propulsor.maxpower;
    }

    return maxpower;
  }

  public getImage(): string {
    return `rocket${this.propulsors.length}.png`;
  }

  public getInfo(): string {
    let row: string = "";
    let count: number = 0;

    row += `
            <tr id="${this.codi}">
            <td><button id="bt_${
              this.codi
            }" type="button" class="btn btn-sm btn-danger">X</button></td>
            <td id="img_${
              this.codi
            }" class="p-1 d-flex flex-column align-items-center">
                <img src="./../assets/${this.getImage()}" alt="Cohet" width="80px" height="auto">
                <span style="font-size: 10px">${this.codi}</span>
            </td>
        `;
    for (let propulsor of this.propulsors) {
      count++;
      row += `
                <td class="text-center">${propulsor.maxpower}</td>
            `;
    }
    if (count < 6) {
      for (let i: number = count; i < 6; i++) {
        row += "<td></td>";
      }
    }
    row += "</tr>";

    return row;
  }

  public accelerar(): boolean {
    const maxpower: number = this.getMaxPower();
    let curpower: number = this.curpower;

    if (curpower === maxpower) {
      return false;
    }

    curpower += Cohet.ACC_FACTOR;
    if (curpower > maxpower) {
      curpower = maxpower;
    }
    this.curpower = curpower;

    return true;
  }

  public frenar(): boolean {
    let curpower: number = this.curpower;

    if (curpower === 0) {
      return false;
    }

    curpower -= Cohet.DEC_FACTOR;
    if (curpower < 0) {
      curpower = 0;
    }
    this.curpower = curpower;

    return true;
  }

  public aturar(): void {
    this.curpower = 0;
  }

  public codiCohet(): string {
    let codi: string = `
            <div id="${
              this.codi
            }" style="display: inline-block; z-index: 100; position: absolute; top: -100px; left: -100px">
                <img src="./../assets/${this.getImage()}" alt="${this.codi}">
            </div>
        `;
    return codi;
  }
}
