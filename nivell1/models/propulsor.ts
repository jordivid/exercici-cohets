export class Propulsor {
    private _maxpower: number;
    // private _curpower: number;

    constructor(maxpower: number) {
        this._maxpower = maxpower;
        // this._curpower = 0;
    }

    public get maxpower(): number {
        return this._maxpower;
    }

    // public get curpower(): number {
    //     return this._curpower;
    // }

    // public set curpower(curpower: number) {
    //     this._curpower = curpower;
    // }
}