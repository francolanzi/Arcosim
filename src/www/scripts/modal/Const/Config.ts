import { Const } from '../../cpnts/Const.js';
import CpntConfig from '../CpntConfig.js';
import RadixSelect from '../RadixSelect.js';
import Value from './Value.js';

class ConstConfig extends CpntConfig<Const> {
  public reload(): void {
    super.reload();

    const value = new Value(this.cpnt.value);
    const radix = new RadixSelect(this.cpnt.radix);

    this.append(value);
    this.append(radix);

    value.addEventListener('change', () => {
      this.cpnt.value = value.value;
      value.value = this.cpnt.value;
    });

    radix.addEventListener('change', () => {
      this.cpnt.radix = radix.radix;
    });
  }
}

customElements.define('cpnt-const-config', ConstConfig);

export default ConstConfig;
