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

    this._path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    this._layer.svg.appendChild(this._path);

    this.move();
  }

  move() {
    const start = this.input.center;
    const end = this.output.center;

    this._path.setAttribute('d', `M ${start.x} ${start.y} L ${end.x} ${end.y}`);
  }

  remove() {
    this._path.remove();
  }
}

module.exports = Link;
