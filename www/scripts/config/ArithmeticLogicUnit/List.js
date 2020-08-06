const Func = require('./Func');
const SVGButton = require('../SVGButton');

class ArithmeticLogicUnitList extends HTMLElement {
  constructor(cpnt) {
    super();

    const supported = cpnt.constructor.supported;

    const add = new SVGButton('www/images/modal/plus.svg');
    this.append(add);

    function addFunc(index, func) {
      const elem = new Func(index, func, supported);
      add.insertAdjacentElement('beforebegin', elem);

      elem.addEventListener('change', () => {
        cpnt.setFunction(elem.index, elem.func);
      });

      elem.addEventListener('remove', () => {
        if (cpnt.functionCount > 1) {
          cpnt.removeFunction(index);
          elem.remove();
        }
      });
    }

    add.addEventListener('click', () => {
      let index = 0;
      while(cpnt.getFunction(index) !== undefined) {
        index++;
      }
      cpnt.setFunction(index, 0);
      addFunc(index, 0);
    });

    for (const func of cpnt.functions) {
      addFunc(...func);
    }
  }
}

customElements.define('cpnt-alu-list', ArithmeticLogicUnitList);

module.exports = ArithmeticLogicUnitList;
