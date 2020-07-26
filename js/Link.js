class Link {
  get input() {
    return this._input;
  }

  get output() {
    return this._output;
  }

  constructor(layer, input, output) {
    this._layer = layer;
    this._input = input;
    this._output = output;

    this._element = document.createElementNS('http://www.w3.org/2000/svg', 'line');

    const inputCenter = input.center;
    const outputCenter = output.center;

    this._element.setAttribute('x1', inputCenter.x);
    this._element.setAttribute('y1', inputCenter.y);
    this._element.setAttribute('x2', outputCenter.x);
    this._element.setAttribute('y2', outputCenter.y);

    this._layer.svg.appendChild(this._element);
  }

  moveInput() {
    const center = this.input.center;

    this._element.setAttribute('x1', center.x);
    this._element.setAttribute('y1', center.y);
  }

  moveOutput() {
    const center = this.output.center;

    this._element.setAttribute('x2', center.x);
    this._element.setAttribute('y2', center.y);
  }

  remove() {
    this._element.remove();
  }
}

module.exports = Link;
