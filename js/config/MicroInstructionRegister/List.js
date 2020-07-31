const Mask = require('./Mask');

class MicroInstructionRegisterList extends HTMLElement {
  constructor(cpnt) {
    super();

    function newMask(name, size) {
      const mask = new Mask(name, size);

      mask.addEventListener('change', () => {
        cpnt.setMask(mask.position, mask.name, mask.size);
      });

      mask.addEventListener('addbefore', () => {
        cpnt.addMask(mask.position, '', 1);
        mask.insertAdjacentElement('beforebegin', newMask('', 1));
      });

      mask.addEventListener('addafter', () => {
        cpnt.addMask(mask.position + 1, '', 1);
        mask.insertAdjacentElement('afterend', newMask('', 1));
      });

      mask.addEventListener('remove', () => {
        if (cpnt.maskCount > 1) {
          cpnt.removeMask(mask.position);
          mask.remove();
        }
      });

      return mask;
    }

    let i = 0;
    let mask = cpnt.getMask(i);

    while (mask) {
      this.prepend(newMask(mask.name, mask.size));
      mask = cpnt.getMask(++i);
    }
  }
}

customElements.define('cpnt-mir-list', MicroInstructionRegisterList);

module.exports = MicroInstructionRegisterList;
