const Func = require('./Func');
const SVGButton = require('../SVGButton');

class ArithmeticLogicUnitFuncList extends HTMLElement {
  constructor(cpnt) {
    super();

    const supported = cpnt.constructor.supported;

    const add = new SVGButton('img/modal/plus.svg');
    this.append(add);

    function addFunc(index, value) {
      const func = new Func(index, value, supported);
      add.insertAdjacentElement('beforebegin', func);

      func.addEventListener('change', () => {
        cpnt.setFunction(func.index, func.func);
      });

      func.addEventListener('remove', () => {
        if (cpnt.functionCount > 1) {
          cpnt.removeFunction(index);
          func.remove();
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

customElements.define('cpnt-alu-func-list', ArithmeticLogicUnitFuncList);

module.exports = ArithmeticLogicUnitFuncList;
