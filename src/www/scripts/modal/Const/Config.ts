import { Const } from '../../cpnts/Const.js';
import Value from './Value.js';

class ConstConfig extends HTMLElement {
  public constructor(cpnt: Const) {
    super();

    const value = new Value(cpnt.value);
    this.append(value);

    value.addEventListener('change', () => {
      cpnt.value = value.value;
      value.value = cpnt.value;
    });
  }
}

customElements.define('cpnt-const-config', ConstConfig);

export default ConstConfig;
