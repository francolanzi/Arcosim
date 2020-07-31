const MaskName = require('./MaskName');
const MaskSize = require('./MaskSize');
const MaskButton = require('./MaskButton');

class MicroInstructionRegisterMask extends HTMLElement {
  get position() {
    const childs = [...this.parentNode.childNodes];
    return childs.length - childs.indexOf(this) - 1;
  }

  get name() {
    return this._maskName.value;
  }

  get size() {
    return this._maskSize.value;
  }

  constructor(name, size) {
    super();

    this._maskName = new MaskName(name);
    this._maskSize = new MaskSize(size);

    const addBefore = new MaskButton('img/modal/plus.svg');
    const addAfter = new MaskButton('img/modal/plus.svg');
    const remove = new MaskButton('img/modal/minus.svg');

    this.appendChild(addBefore);
    this.appendChild(this._maskName);
    this.appendChild(this._maskSize);
    this.appendChild(remove);
    this.appendChild(addAfter);

    addBefore.addEventListener('click', () =>
      this.dispatchEvent(new Event('addbefore')));

    addAfter.addEventListener('click', () =>
      this.dispatchEvent(new Event('addafter')));

    remove.addEventListener('click', () =>
      this.dispatchEvent(new Event('remove')));
  }
}

customElements.define('cpnt-mir-mask', MicroInstructionRegisterMask);

module.exports = MicroInstructionRegisterMask;
