class AssemblerLabel extends HTMLElement {
  public constructor (content: string) {
    super();

    this.textContent = content;
  }
}

customElements.define('cpnt-assembler-label', AssemblerLabel);

export default AssemblerLabel;
