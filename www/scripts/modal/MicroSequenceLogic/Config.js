import List from './List.js';

class MicroSequenceLogicConfig extends HTMLElement {
  constructor(cpnt) {
    super();

    const list = new List(cpnt);

    this.append(list);
  }
}

customElements.define('cpnt-msl-config', MicroSequenceLogicConfig);

export default MicroSequenceLogicConfig;
