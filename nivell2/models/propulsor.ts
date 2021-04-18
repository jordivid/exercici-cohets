export class Propulsor {
  private _maxpower: number;

  constructor(maxpower: number) {
    this._maxpower = maxpower;
  }

  public get maxpower(): number {
    return this._maxpower;
  }
}
