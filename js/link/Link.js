const LinkCorner = require('./LinkCorner');

class Link {
  get input() {
    return this._input;
  }

  get output() {
    return this._output;
  }

  get value() {
    return this._value;
  }

  constructor(layer, input, output) {
    this._layer = layer;
    this._input = input;
    this._output = output;

    output.addLink(this);

    this._value = 0;

    this._corners = [];

    this._line = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    this._areas = [document.createElementNS('http://www.w3.org/2000/svg', 'line')];

    this._line.classList.add('cpnt-link');
    this._areas[0].classList.add('cpnt-link-area');

    this._layer.svg.appendChild(this._line);
    this._layer.svg.appendChild(this._areas[0]);

    this._areas[0].addEventListener('dblclick', this.addCorner.bind(this));

    this._line.points.appendItem(this._layer.svg.createSVGPoint());
    this._line.points.appendItem(this._layer.svg.createSVGPoint());

    this.moveInput();
    this.moveOutput();
  }

  send(value) {
    this._value = value;
    this.input.receive(this.value);
  }

  moveInput() {
    const center = this.input.center;
    const point = this._line.points.getItem(0);

    point.x = center.x;
    point.y = center.y;

    this._areas[0].setAttribute('x1', center.x);
    this._areas[0].setAttribute('y1', center.y);
  }

  moveOutput() {
    const i = this._corners.length;
    const center = this.output.center;
    const point = this._line.points.getItem(i + 1);

    point.x = center.x;
    point.y = center.y;

    this._areas[i].setAttribute('x2', center.x);
    this._areas[i].setAttribute('y2', center.y);
  }

  moveCorner(corner) {
    const center = corner.center;
    const i = this._corners.indexOf(corner);

    const point = this._line.points.getItem(i + 1);

    point.x = center.x;
    point.y = center.y;

    this._areas[i].setAttribute('x2', center.x);
    this._areas[i].setAttribute('y2', center.y);

    this._areas[i + 1].setAttribute('x1', center.x);
    this._areas[i + 1].setAttribute('y1', center.y);
  }

  remove() {
    this._line.remove();
    this._input.unlink();
    this._areas.forEach(area => area.remove());
    this._corners.forEach(corner => corner.remove());
  }

  addCorner(ev) {
    const i = this._areas.indexOf(ev.target);

    const corner = new LinkCorner(ev.pageX, ev.pageY);
    const area = document.createElementNS('http://www.w3.org/2000/svg', 'line');

    area.classList.add('cpnt-link-area');

    area.addEventListener('dblclick', this.addCorner.bind(this));
    corner.addEventListener('move', () => this.moveCorner(corner));
    corner.addEventListener('remove', () => this.removeCorner(corner));

    document.body.appendChild(corner);
    this._layer.svg.appendChild(area);

    this._corners.splice(i, 0, corner);
    this._areas.splice(i, 0, area);

    area.setAttribute('x1', ev.target.getAttribute('x1'));
    area.setAttribute('y1', ev.target.getAttribute('y1'));

    this._line.points.insertItemBefore(this._layer.svg.createSVGPoint(), i + 1);

    this.moveCorner(corner);
  }

  removeCorner(corner) {
    const i = this._corners.indexOf(corner);

    const area = this._areas[i];

    corner.remove();
    area.remove();

    this._corners.splice(i, 1);
    this._areas.splice(i, 1);

    this._line.points.removeItem(i + 1);

    if (i > 0) {
      this.moveCorner(this._corners[i - 1]);
    } else {
      this.moveInput();
    }
  }
}

module.exports = Link;
