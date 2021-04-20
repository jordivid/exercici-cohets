export class Propulsor {
    constructor(maxpower) {
        this._maxpower = maxpower;
    }
    get maxpower() {
        return this._maxpower;
    }
}
