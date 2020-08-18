class MicroInstructionRegisterMaskName extends HTMLInputElement {
  constructor(name) {
    super();

    this.type = 'text';
    this.value = name;

    this.setAttribute('is', 'cpnt-mir-mask-name');
  }
}

customElements.define('cpnt-mir-mask-name', MicroInstructionRegisterMaskName, { extends: 'input' });

export default MicroInstructionRegisterMaskName;
