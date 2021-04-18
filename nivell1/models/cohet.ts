import { Propulsor } from "./propulsor";

export class Cohet {
    private _codi: string;
    private _propulsors: Propulsor[];
    private _curpower: number;
    public static ACC_FACTOR: number = 10; // Factor d'acceleració
    public static DEC_FACTOR: number = 10; // Factor de frenada

    constructor(codi: string, props: number[]) {
        this._codi = codi;
        this._propulsors = new Array();
        this._curpower = 0;

        for(let propulsor of props) {
            this._propulsors.push(new Propulsor(propulsor));
        }
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

    public set curpower(power: number) {
        this._curpower = power;
    }

    public getMaxPower(): number {
        let maxpower: number = 0;

        for(let propulsor of this.propulsors) {
            maxpower += propulsor.maxpower;
        }

        return maxpower;
    }

    public getInfo(): string {
        let info: string = "Cohet: " + this.codi + "; Propulsors: ";
        let first = true;

        for (let propulsor of this.propulsors) {
            if (!first) {
                info += ", ";
            }
            first = false;
            info += propulsor.maxpower;
        }

        info += "; Potència actual: " + this.curpower;

        return info;
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
}
