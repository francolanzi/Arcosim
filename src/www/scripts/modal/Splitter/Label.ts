class SplitterLabel extends HTMLElement {
  public constructor(content: string) {
    super();

    this.textContent = content;
  }
}

customElements.define('cpnt-splitter-label', SplitterLabel);

export default SplitterLabel;
