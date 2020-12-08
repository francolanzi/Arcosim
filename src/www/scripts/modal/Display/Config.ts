import { Display } from '../../cpnts/Display.js';
import CpntConfig from '../CpntConfig.js';
import RadixSelect from '../RadixSelect.js';

class DisplayConfig extends CpntConfig<Display> {
  public reload(): void {
    super.reload();

    const radix = new RadixSelect(this.cpnt.radix);
    this.append(radix);

    radix.addEventListener('change', () =>
      this.cpnt.radix = radix.radix);
  }
}

customElements.define('cpnt-display-config', DisplayConfig);

export default DisplayConfig;
