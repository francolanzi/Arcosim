class LinkElement {
  get input() {
    return this._input;
  }

  get output() {
    return this._output;
  }

  get element() {
    return this._element;
  }

  constructor(input, output) {
    this._input = input;
    this._output = output;

    this._element = document.createElementNS('http://www.w3.org/2000/svg', 'line');

    const inputCenter = input.center;
    const outputCenter = output.center;

    this.element.setAttribute('x1', inputCenter.x);
    this.element.setAttribute('y1', inputCenter.y);
    this.element.setAttribute('x2', outputCenter.x);
    this.element.setAttribute('y2', outputCenter.y);
  }

  moveInput() {
    const center = this.input.center;

    this.element.setAttribute('x1', center.x);
    this.element.setAttribute('y1', center.y);
  }

  moveOutput() {
    const center = this.output.center;

    this.element.setAttribute('x2', center.x);
    this.element.setAttribute('y2', center.y);
  }

  remove() {
    this.element.remove();
  }
}

module.exports = LinkElement;
