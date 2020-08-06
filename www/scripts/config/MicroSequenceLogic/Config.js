const CondList = require('./CondList');

class MicroSequenceLogicConfig extends HTMLElement {
  constructor(cpnt) {
    super();

    const condList = new CondList(cpnt);

    this.append(condList);
  }
}

customElements.define('cpnt-msl-config', MicroSequenceLogicConfig);

module.exports = MicroSequenceLogicConfig;
