class MicroInstructionRegisterMaskName extends HTMLInputElement {
  public constructor(name: string) {
    super();

    this.type = 'text';
    this.value = name;

    this.setAttribute('is', 'cpnt-mir-mask-name');
  }
}

customElements.define('cpnt-mir-mask-name', MicroInstructionRegisterMaskName, { extends: 'input' });

export default MicroInstructionRegisterMaskName;
