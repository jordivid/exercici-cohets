import { Propulsor } from "./propulsor";
export class Cohet {
    constructor(codi, props) {
        this._codi = codi;
        this._propulsors = new Array();
        this._curpower = 0;
        this._posX = 0;
        this._posY = 0;
        for (let propulsor of props) {
            this._propulsors.push(new Propulsor(propulsor));
        }
    }
    // Verifica l'existència d'un cohet a l'array
    static hasCohet(codi, cohets) {
        for (let cohet of cohets) {
            if (cohet.codi === codi) {
                return true;
            }
        }
        return false;
    }
    static getCohet(codi, cohets) {
        for (let cohet of cohets) {
            if (cohet.codi === codi) {
                return cohet;
            }
        }
        return null;
    }
    // Elimina un cohet
    static eliminarCohet(codi, cohets) {
        for (let i = 0; i < cohets.length; i++) {
            if (cohets[i].codi === codi) {
                cohets.splice(i, 1);
                break;
            }
        }
        this.serialitzar(cohets, "llista_cohets");
    }
    // Converteix l'array de cohets en string
    static serialitzar(cohets, to) {
        sessionStorage.setItem(to, JSON.stringify(cohets));
    }
    // Restaura l'array de cohets
    static deserialitzar(from) {
        class myProp {
            constructor() {
                this._maxpower = 0;
            }
        }
        class myRocket {
            constructor() {
                this._codi = "";
                this._curpower = 0;
                this._propulsors = new Array();
            }
        }
        let cohets = new Array();
        let guardats = sessionStorage.getItem(from);
        if (typeof guardats === "string") {
            let rockets = JSON.parse(guardats);
            let rocket;
            for (rocket of rockets) {
                let props = new Array();
                for (let prop of rocket._propulsors) {
                    props.push(prop._maxpower);
                }
                cohets.push(new Cohet(rocket._codi, props));
            }
        }
        return cohets;
    }
    // Getters
    get codi() {
        return this._codi;
    }
    get propulsors() {
        return this._propulsors;
    }
    get curpower() {
        return this._curpower;
    }
    get posX() {
        return this._posX;
    }
    get posY() {
        return this._posY;
    }
    // Setters
    set curpower(power) {
        this._curpower = power;
    }
    set posX(x) {
        this._posX = x;
    }
    set posY(y) {
        this._posY = y;
    }
    // Obtenció màxima potència d'un cohet
    getMaxPower() {
        let maxpower = 0;
        for (let propulsor of this.propulsors) {
            maxpower += propulsor.maxpower;
        }
        return maxpower;
    }
    // Obtenció imatge vinculada a cohet segons nº propulsors
    getImage() {
        return `rocket${this.propulsors.length}.png`;
    }
    // Generació codi HTML per la taula d'informació de cohets fabricats
    getInfo() {
        let row = "";
        let count = 0;
        row += `
            <tr id="${this.codi}">
            <td><button id="bt_${this.codi}" type="button" class="btn btn-sm btn-danger">X</button></td>
            <td id="img_${this.codi}" class="p-1 d-flex flex-column align-items-center">
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
            for (let i = count; i < 6; i++) {
                row += "<td></td>";
            }
        }
        row += "</tr>";
        return row;
    }
    // Generació codi HTML per la taula de classificació en cursa
    classified(posicio) {
        let row = "";
        row += `
      <tr>
      <td class="text-center"><span class="d-flex justify-content-center align-items-center" style="font-size: 30px">${posicio}</span></td>
      <td id="img_${this.codi}" class="p-1 d-flex flex-column justify-content-center align-items-center">
          <img src="./../assets/${this.getImage()}" alt="Cohet" width="80px" height="auto">
          <span style="font-size: 10px">${this.codi}</span>
      </td>
      </tr>
    `;
        return row;
    }
    // Acceleració del cohet
    accelerar() {
        const maxpower = this.getMaxPower();
        let curpower = this.curpower;
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
    // Frenada del cohet
    frenar() {
        let curpower = this.curpower;
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
    aturar() {
        this.curpower = 0;
    }
    // Posicionament del cohet a la graella de la cursa
    codiCohet() {
        let codi = `
            <div id="${this.codi}" style="display: inline-block; z-index: 100; position: absolute; top: -100px; left: -100px">
                <img src="./../assets/${this.getImage()}" alt="${this.codi}">
            </div>
        `;
        return codi;
    }
}
Cohet.ACC_FACTOR = 10; // Factor d'acceleració
Cohet.DEC_FACTOR = 10; // Factor de frenada
