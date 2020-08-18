class MicroInstructionRegisterLabel extends HTMLElement {
  constructor(content) {
    super();

    this.textContent = content;
  }
}

customElements.define('cpnt-mir-label', MicroInstructionRegisterLabel);

export default MicroInstructionRegisterLabel;
