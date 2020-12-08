import { Clock } from '../../cpnts/Clock.js';
import CpntConfig from '../CpntConfig.js';
import Subcycles from './Subcycles.js';

class ClockConfig extends CpntConfig<Clock> {
  public reload(): void {
    super.reload();

    const subcycles = new Subcycles(this.cpnt.subcycles);
    this.append(subcycles);

    subcycles.addEventListener('change', () => {
      while (subcycles.value > this.cpnt.subcycles) {
        this.cpnt.addSubcycle();
      }
      while (subcycles.value < this.cpnt.subcycles) {
        this.cpnt.removeSubcycle();
      }
    });
  }
}

customElements.define('cpnt-clock-config', ClockConfig);

export default ClockConfig;
