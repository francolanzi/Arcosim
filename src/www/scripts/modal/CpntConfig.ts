import Component from '../Component';

abstract class CpntConfig<Cpnt extends Component> extends HTMLElement {
  private readonly _cpnt: Cpnt;

  public get cpnt(): Cpnt {
    return this._cpnt;
  }

  constructor(cpnt: Cpnt) {
    super();

    this._cpnt = cpnt;
    this.setAttribute('is', 'cpnt-config');
    this.reload();
  }

  public clear(): void {
    while(this.firstChild) {
      this.removeChild(this.firstChild);
    }
  }

  public reload(): void {
    this.clear();
  }
}

export default CpntConfig;
