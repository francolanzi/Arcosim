const Cond = require('./Cond');
const SVGButton = require('../SVGButton');

class MicroSequenceLogicList extends HTMLElement {
  constructor(cpnt) {
    super();

    const supported = cpnt.constructor.supported;

    const add = new SVGButton('www/images/modal/plus.svg');
    this.append(add);

    const indexes = [];

    function addCond(index, cond) {
      const elem = new Cond(index, cond, supported);
      add.insertAdjacentElement('beforebegin', elem);

      indexes.push(index);

      elem.addEventListener('change', () => {
        if (indexes.indexOf(elem.index) >= 0) {
          elem.index = indexes[elem.position];
        } else if (elem.index !== indexes[elem.position]) {
          cpnt.removeCondition(indexes[elem.position]);
          indexes[elem.position] = elem.index;
        }
        cpnt.setCondition(elem.index, elem.cond);
      });

      elem.addEventListener('remove', () => {
        if (cpnt.conditionCount > 1) {
          cpnt.removeCondition(elem.index);
          indexes.splice(elem.position, 1);
          elem.remove();
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
