class MicroInstructionRegisterLabel extends HTMLElement {
  public constructor(content: string) {
    super();

    this.textContent = content;
  }
}

customElements.define('cpnt-mir-label', MicroInstructionRegisterLabel);

export default MicroInstructionRegisterLabel;
