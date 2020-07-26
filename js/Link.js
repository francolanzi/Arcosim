const LinkCorner = require('./LinkCorner');

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

    this._corners = [];

    this._line = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    this._areas = [document.createElementNS('http://www.w3.org/2000/svg', 'line')];

    this._line.classList.add('cpnt-link');
    this._areas[0].classList.add('cpnt-link-area');

    this._layer.svg.appendChild(this._line);
    this._layer.svg.appendChild(this._areas[0]);

    this._areas[0].addEventListener('dblclick', this.addCorner.bind(this));

    this.move();
  }

  move() {
    const start = this.input.center;

    let data = `${start.x},${start.y} `;

    this._areas[0].setAttribute('x1', start.x);
    this._areas[0].setAttribute('y1', start.y);

    let i = 0;

    while (i < this._corners.length) {
      const center = this._corners[i].center;

      data += `${center.x},${center.y} `;

      this._areas[i].setAttribute('x2', center.x);
      this._areas[i].setAttribute('y2', center.y);

      this._areas[i + 1].setAttribute('x1', center.x);
      this._areas[i + 1].setAttribute('y1', center.y);

      i++;
    }

    const end = this.output.center;

    data += `${end.x},${end.y}`;

    this._areas[i].setAttribute('x2', end.x);
    this._areas[i].setAttribute('y2', end.y);

    this._line.setAttribute('points', data);
  }

  remove() {
    this._line.remove();
    this._areas.forEach(area => area.remove());
    this._corners.forEach(corner => corner.remove());
  }

  addCorner(ev) {
    const i = this._areas.indexOf(ev.target);

    const corner = new LinkCorner(ev.pageX, ev.pageY);
    const area = document.createElementNS('http://www.w3.org/2000/svg', 'line');

    area.classList.add('cpnt-link-area');

    area.addEventListener('dblclick', this.addCorner.bind(this));
    corner.addEventListener('move', this.move.bind(this));
    corner.addEventListener('remove', () => this.removeCorner(corner));

    document.body.appendChild(corner);
    this._layer.svg.appendChild(area);

    this._corners.splice(i, 0, corner);
    this._areas.splice(i, 0, area);

    this.move();
  }

  removeCorner(corner) {
    const i = this._corners.indexOf(corner);

    const area = this._areas[i];

    corner.remove();
    area.remove();

    this._corners.splice(i, 1);
    this._areas.splice(i, 1);

    this.move();
  }
}

module.exports = Link;
