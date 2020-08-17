import Subcycles from './Subcycles.js';

class ClockConfig extends HTMLElement {
  constructor(cpnt) {
    super();

    const subcycles = new Subcycles(cpnt.subcycles);
    this.append(subcycles);

    subcycles.addEventListener('change', () => {
      while (subcycles.value > cpnt.subcycles) {
        cpnt.addSubcycle();
      }
      while (subcycles.value < cpnt.subcycles) {
        cpnt.removeSubcycle();
      }
    });
  }
}

customElements.define('cpnt-clock-config', ClockConfig);

export default ClockConfig;
