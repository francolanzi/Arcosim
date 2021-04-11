import { MemoryAddressRegister } from '../../cpnts/MemoryAddressRegister.js';
import CpntConfig from '../CpntConfig.js';
import Value from './Value.js';

class MemoryAddressRegisterConfig extends CpntConfig<MemoryAddressRegister> {
  public reload(): void {
    super.reload();

    const value = new Value(this.cpnt.value);
    this.append(value);
  }
}

customElements.define('cpnt-mar-config', MemoryAddressRegisterConfig);

export default MemoryAddressRegisterConfig;
