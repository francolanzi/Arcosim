const List = require('./List');

class MicroSequenceLogicConfig extends HTMLElement {
  constructor(cpnt) {
    super();

    const list = new List(cpnt);

    this.append(list);
  }
}

customElements.define('cpnt-msl-config', MicroSequenceLogicConfig);

module.exports = MicroSequenceLogicConfig;
