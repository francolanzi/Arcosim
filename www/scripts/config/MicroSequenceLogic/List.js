const Cond = require('./Cond');
const SVGButton = require('../SVGButton');

class MicroSequenceLogicList extends HTMLElement {
  constructor(cpnt) {
    super();

    const supported = cpnt.constructor.supported;

    const add = new SVGButton('www/images/modal/plus.svg');
    this.append(add);

    function addCond(index, value) {
      const cond = new Cond(index, value, supported);
      add.insertAdjacentElement('beforebegin', cond);

      cond.addEventListener('change', () => {
        cpnt.setCondition(cond.index, cond.cond);
      });

      cond.addEventListener('remove', () => {
        if (cpnt.conditionCount > 1) {
          cpnt.removeCondition(cond.index);
          cond.remove();
        }
      });
    }

    add.addEventListener('click', () => {
      let index = 0;
      while(cpnt.getCondition(index) !== undefined) {
        index++;
      }
      cpnt.setCondition(index, 0);
      addCond(index, 0);
    });

    for (const cond of cpnt.conditions) {
      addCond(...cond);
    }
  }
}

customElements.define('cpnt-msl-list', MicroSequenceLogicList);

module.exports = MicroSequenceLogicList;
