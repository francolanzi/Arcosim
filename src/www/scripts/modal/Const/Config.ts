import { Const } from '../../cpnts/Const.js';
import RadixSelect from '../RadixSelect.js';
import Value from './Value.js';

class ConstConfig extends HTMLElement {
  public constructor(cpnt: Const) {
    super();

    const value = new Value(cpnt.value);
    const radix = new RadixSelect(cpnt.radix);

    this.append(value);
    this.append(radix);

    value.addEventListener('change', () => {
      cpnt.value = value.value;
      value.value = cpnt.value;
    });

    radix.addEventListener('change', () => {
      cpnt.radix = radix.radix;
    });
  }
}

customElements.define('cpnt-const-config', ConstConfig);

export default ConstConfig;
