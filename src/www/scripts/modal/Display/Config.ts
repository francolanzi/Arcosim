import { Display } from '../../cpnts/Display.js';
import RadixSelect from '../RadixSelect.js';

class DisplayConfig extends HTMLElement {
  public constructor(cpnt: Display) {
    super();

    const radix = new RadixSelect(cpnt.radix);
    this.append(radix);

    radix.addEventListener('change', () => {
      cpnt.radix = radix.radix;
    });
  }
}

customElements.define('cpnt-display-config', DisplayConfig);

export default DisplayConfig;
