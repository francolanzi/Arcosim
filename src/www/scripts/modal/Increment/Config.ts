import { Increment } from '../../cpnts/Increment.js';
import CpntConfig from '../CpntConfig.js';
import Value from './Value.js';

class IncrementConfig extends CpntConfig<Increment> {
  public reload (): void {
    super.reload();

    const value = new Value(this.cpnt.value);

    this.append(value);

    value.addEventListener('change', () => {
      this.cpnt.value = value.value;
      value.value = this.cpnt.value;
    });
  }
}

customElements.define('cpnt-increment-config', IncrementConfig);

export default IncrementConfig;
