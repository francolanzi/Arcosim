import { MemoryAddressRegister } from '../../cpnts/MemoryAddressRegister.js';
import CpntConfig from '../CpntConfig.js';
import Bits from './Bits.js';
import Value from './Value.js';

class MemoryAddressRegisterConfig extends CpntConfig<MemoryAddressRegister> {
  public reload(): void {
    super.reload();

    const bits = new Bits(this.cpnt.bits);
    const value = new Value(this.cpnt.value);

    this.append(bits);
    this.append(value);

    bits.addEventListener('change', () => {
      this.cpnt.bits = bits.value;
      value.value = this.cpnt.value;
    });
  }
}

customElements.define('cpnt-mar-config', MemoryAddressRegisterConfig);

export default MemoryAddressRegisterConfig;
