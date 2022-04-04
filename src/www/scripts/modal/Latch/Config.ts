import { Latch } from '../../cpnts/Latch.js';
import CpntConfig from '../CpntConfig.js';
import Value from './Value.js';

class LatchConfig extends CpntConfig<Latch> {
  public reload (): void {
    super.reload();

    const value = new Value(this.cpnt.value);
    this.append(value);
  }
}

customElements.define('cpnt-latch-config', LatchConfig);

export default LatchConfig;
