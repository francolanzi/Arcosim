const Func = require('./Func');
const ImgButton = require('../ImgButton');

class ShifterList extends HTMLElement {
  constructor(cpnt) {
    super();

    const supported = cpnt.constructor.supported;

    const add = new ImgButton('images/modal/plus.svg');
    this.append(add);

    const indexes = [];

    function addFunc(index, { func, value }) {
      const elem = new Func(index, func, value, supported);
      add.insertAdjacentElement('beforebegin', elem);

      indexes.push(index);

      elem.addEventListener('change', () => {
        if (indexes.indexOf(elem.index) >= 0) {
          elem.index = indexes[elem.position];
        } else if (elem.index !== indexes[elem.position]) {
          cpnt.removeFunction(indexes[elem.position]);
          indexes[elem.position] = elem.index;
        }
        cpnt.setFunction(elem.index, elem.func, elem.value);
      });

      elem.addEventListener('remove', () => {
        if (cpnt.functionCount > 1) {
          cpnt.removeFunction(index);
          indexes.splice(elem.position, 1);
          elem.remove();
        }
      });
    }

    add.addEventListener('click', () => {
      let index = 0;
      while(cpnt.getFunction(index) !== undefined) {
        index++;
      }
      cpnt.setFunction(index, 0, 0);
      addFunc(index, { func: 0, value: 0 });
    });

    for (const func of cpnt.functions) {
      addFunc(...func);
    }
  }
}

customElements.define('cpnt-shifter-list', ShifterList);

module.exports = ShifterList;
