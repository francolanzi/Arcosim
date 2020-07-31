class MicroInstructionRegisterMaskName extends HTMLInputElement {
  constructor(name) {
    super();

    this.type = 'text';
    this.value = name;
  }
}

customElements.define('cpnt-mir-mask-name', MicroInstructionRegisterMaskName, { extends: 'input' });

module.exports = MicroInstructionRegisterMaskName;
