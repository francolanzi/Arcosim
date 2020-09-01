import CustomSelect from '../CustomSelect.js';

class MicroSequenceLogicCond extends HTMLElement {
  get index() {
    return this._index;
  }

  get cond() {
    return parseInt(this._cond.value);
  }

  constructor(index, cond, supported) {
    super();

    this._index = index;

    this._cond = new CustomSelect(cond, supported);
    this._cond.id = `condition${index}`;
    this.append(this._cond);

    const label = document.createElement('label');
    label.textContent = `${index} = `;
    label.setAttribute('for', this._cond.id);
    this.prepend(label);
  }
}

customElements.define('cpnt-msl-cond', MicroSequenceLogicCond);

export default MicroSequenceLogicCond;
