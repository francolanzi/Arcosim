const Link = require('./Link');

class LinkLayer extends HTMLElement {
  constructor() {
    super();

    this._inputLinks = new Map();
    this._outputLinks = new Map();

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
    if (!this._inputLinks.has(input)) {
      const link = new Link(input, output);

      this._svg.appendChild(link.element);
      this._inputLinks.set(input, link);

      if (!this._outputLinks.has(output)) {
        this._outputLinks.set(output, new Set());
      }
      this._outputLinks.get(output).add(link);
    }
  }

  moveInput(input) {
    if (this._inputLinks.has(input)) {
      this._inputLinks.get(input).moveInput();
    }
  }

  moveOutput(output) {
    if (this._outputLinks.has(output)) {
      this._outputLinks.get(output).forEach(link =>
        link.moveOutput());
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
