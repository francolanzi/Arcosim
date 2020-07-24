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
      const link = document.createElementNS('http://www.w3.org/2000/svg', 'line');

      const inputCenter = input.center;
      const outputCenter = output.center;

      link.setAttribute('x1', inputCenter.x);
      link.setAttribute('y1', inputCenter.y);
      link.setAttribute('x2', outputCenter.x);
      link.setAttribute('y2', outputCenter.y);

      this._svg.appendChild(link);

      this._links.set(input, { output, link });
    }
  }

  moveInput(input) {
    if (this._links.has(input)) {
      const link = this._links.get(input).link;
      const center = input.center;

      link.setAttribute('x1', center.x);
      link.setAttribute('y1', center.y);
    }
  }

  moveOutput(output) {
    this._links.forEach(link => {
      if (output == link.output) {
        const center = output.center;

        link.link.setAttribute('x2', center.x);
        link.link.setAttribute('y2', center.y);
      }
    });
  }

  removeInput(input) {
    if (this._links.has(input)) {
      const link = this._links.get(input).link;

      this._links.delete(input);
      link.remove();
    }
  }

  removeOutput(output) {
    this._links.forEach((link, input) => {
      if (output == link.output) {
        this._links.delete(input);
        link.link.remove();
      }
    });
  }
}

customElements.define('link-layer', LinkLayer);

module.exports = LinkLayer;
