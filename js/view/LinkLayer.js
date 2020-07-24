const LinkElement = require('./Link');

class LinkLayer extends HTMLElement {
  constructor() {
    super();

    this._links = new Map();

    this._svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.appendChild(this._svg);

    new ResizeObserver(this.resize.bind(this)).observe(this);
    window.addEventListener('resize', this.resize.bind(this));
    window.addEventListener('scroll', this.resize.bind(this));
  }

  resize() {
    const rect = this.getBoundingClientRect();

    const x = window.scrollX;
    const y = window.scrollY;
    const width = rect.width;
    const height = rect.height;

    this._svg.setAttribute('width', width);
    this._svg.setAttribute('height', height);
    this._svg.setAttribute('viewBox', `${x} ${y} ${width} ${height}`);
  }

  addLink(input, output) {
    if (!this._links.has(input)) {
      const link = new LinkElement(input, output);
      this._svg.appendChild(link.element);
      this._links.set(input, link);
    }
  }

  moveInput(input) {
    if (this._links.has(input)) {
      this._links.get(input).moveInput();
    }
  }

  moveOutput(output) {
    this._links.forEach(link => {
      if (output == link.output) {
        link.moveOutput();
      }
    });
  }

  removeInput(input) {
    if (this._links.has(input)) {
      this._links.get(input).remove();
      this._links.delete(input);
    }
  }

  removeOutput(output) {
    this._links.forEach((link, input) => {
      if (output == link.output) {
        this._links.delete(input);
        link.element.remove();
      }
    });
  }
}

customElements.define('link-layer', LinkLayer);

module.exports = LinkLayer;
