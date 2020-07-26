const Link = require('./Link');

class LinkLayer extends HTMLElement {
  get svg() {
    return this._svg;
  }

  constructor() {
    super();

    this._inputLinks = new Map();
    this._outputLinks = new Map();

    this._svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.appendChild(this.svg);

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

    this.svg.setAttribute('width', width);
    this.svg.setAttribute('height', height);
    this.svg.setAttribute('viewBox', `${x} ${y} ${width} ${height}`);
  }

  addLink(input, output) {
    if (!this._inputLinks.has(input)) {
      const link = new Link(this, input, output);

      this._inputLinks.set(input, link);

      if (!this._outputLinks.has(output)) {
        this._outputLinks.set(output, new Set());
      }
      this._outputLinks.get(output).add(link);
    }
  }

  moveInput(input) {
    if (this._inputLinks.has(input)) {
      this._inputLinks.get(input).move();
    }
  }

  moveOutput(output) {
    if (this._outputLinks.has(output)) {
      this._outputLinks.get(output).forEach(link =>
        link.move());
    }
  }

  removeInput(input) {
    if (this._inputLinks.has(input)) {
      const link = this._inputLinks.get(input);
      const outputSet = this._outputLinks.get(link.output);

      this._inputLinks.delete(input);

      outputSet.delete(link);
      if (outputSet.size == 0) {
        this._outputLinks.delete(link.output);
      }

      link.remove();
    }
  }

  removeOutput(output) {
    if (this._outputLinks.has(output)) {
      this._outputLinks.get(output).forEach(link => {
        this._inputLinks.delete(link.input);
        link.remove();
      });
      this._outputLinks.delete(output);
    }
  }
}

customElements.define('link-layer', LinkLayer);

module.exports = LinkLayer;
