import { MemoryBufferRegister } from '../../cpnts/MemoryBufferRegister.js';
import CpntConfig from '../CpntConfig.js';
import Value from './Value.js';

class MemoryBufferRegisterConfig extends CpntConfig<MemoryBufferRegister> {
  public reload(): void {
    super.reload();

    const value = new Value(this.cpnt.value);
    this.append(value);
  }
}

customElements.define('cpnt-mbr-config', MemoryBufferRegisterConfig);

export default MemoryBufferRegisterConfig;
