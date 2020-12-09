import Component from '../Component.js';
import CpntLabelEditor from './CpntLabelEditor.js';
import CpntLoader from './CpntLoader.js';

class CpntConfig<Cpnt extends Component> extends HTMLElement {
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

    const loader = new CpntLoader(this.cpnt);
    const label = new CpntLabelEditor(this.cpnt);

    this.append(loader);
    this.append(label);

    loader.addEventListener('import', () => this.reload());
  }
}

customElements.define('cpnt-config', CpntConfig);

export default CpntConfig;
