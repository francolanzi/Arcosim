const Input = require('./io/Input');
const Output = require('./io/Output');

class Component extends HTMLElement {
  static get type() {
    return this.name.replace(/([a-z])([A-Z])/g, '$1 $2');
  }

  static get svg() {
    throw new Error('svg static property must be overrided');
  }

  get id() {
    return this._id;
  }

  get top() {
    return this._top;
  }

  get left() {
    return this._left;
  }

  get trash() {
    return this._trash;
  }

  set trash(trash) {
    this._trash = trash;
  }

  get inputs() {
    return this._inputs.values();
  }

  get outputs() {
    return this._outputs.values();
  }

  // eslint-disable-next-line class-methods-use-this
  get config() {
    return null;
  }

  constructor(top, left) {
    super();

    if (this.constructor === Component) {
      throw new Error('Component class can not be instantiated');
    }

    if (!this.constructor._count) {
      this.constructor._count = new Map();
    }

    const count = this.constructor._count.get(this.constructor.name);
    this._id = count ? count + 1 : 1;
    this.constructor._count.set(this.constructor.name, this._id);

    this.classList.add('component');

    this.style.top = `${top}px`;
    this.style.left = `${left}px`;

    this._top = top;
    this._left = left;

    this._inputs = new Map();
    this._outputs = new Map();

    this._mouse = { x: 0, y: 0 };

    this._move = ev => this.move(ev);
    this._drop = ev => this.drop(ev);

    const svg = this.constructor.svg;
    const image = new Image(svg.width, svg.height);

    image.src = svg.src;
    this.append(image);

    image.addEventListener('mousedown', ev => this.drag(ev));
    image.addEventListener('dblclick', () => this.dispatchEvent(new Event('config')));
  }

  // eslint-disable-next-line no-unused-vars
  run() {
    let changed = false;
    this._inputs.forEach(input =>
      changed = changed || input.changed);
    this._outputs.forEach(output =>
      changed = changed || output.changed);
    return changed;
  }

  stop() {
    this.dispatchEvent(new Event('stop'));
  }

  reset() {
    this._inputs.forEach(input => input.reset());
    this._outputs.forEach(output => output.reset());
  }

  drag(ev) {
    const rect = this.getBoundingClientRect();

    this._mouse.x = ev.clientX - rect.left;
    this._mouse.y = ev.clientY - rect.top;

    document.addEventListener('mousemove', this._move);
    document.addEventListener('mouseup', this._drop);

    this.classList.add('dragging');

    this.dispatchEvent(new Event('drag'));
  }

  move(ev) {
    this._top = Math.max(ev.pageY - this._mouse.y, 0);
    this._left = Math.max(ev.pageX - this._mouse.x, 0);

    this.style.top = `${this.top}px`;
    this.style.left = `${this.left}px`;

    const trashed = this.trashed(ev);
    this.classList.toggle('trashed', trashed);
    this._trash.active = trashed;

    this.dispatchEvent(new Event('move'));
  }

  drop(ev) {
    document.removeEventListener('mousemove', this._move);
    document.removeEventListener('mouseup', this._drop);

    this.classList.remove('dragging');

    this._trash.active = false;

    this.dispatchEvent(new Event('drop'));

    if (this.trashed(ev)) {
      this.remove();
      this.dispatchEvent(new Event('remove'));
    }
  }

  trashed(ev) {
    if (!this.trash) {
      return false;
    }

    const rect = this.trash.getBoundingClientRect();

    return ev.clientY >= rect.top
        && ev.clientX >= rect.left
        && ev.clientY <= rect.bottom
        && ev.clientX <= rect.right;
  }

  addInput(name, x, y) {
    const input = new Input(this, name, x, y);

    this._inputs.set(input.id, input);
    this.append(input);

    input.addEventListener('link', ev =>
      this.dispatchEvent(new CustomEvent('link', {
        detail: { input, output: ev.detail },
      })));

    input.addEventListener('unlink', () =>
      this.dispatchEvent(new CustomEvent('unlink', { detail: input })));

    return input;
  }

  addOutput(name, x, y) {
    const output = new Output(this, name, x, y);

    this._outputs.set(output.id, output);
    this.append(output);

    return output;
  }

  getInput(id) {
    return this._inputs.get(id);
  }

  getOutput(id) {
    return this._outputs.get(id);
  }

  removeInput(id) {
    const input = this._inputs.get(id);
    if (input) {
      this._inputs.delete(id);
      input.remove();
    }
  }

  removeOutput(id) {
    const output = this._outputs.get(id);
    if (output) {
      this._outputs.delete(id);
      output.remove();
    }
  }
}

module.exports = Component;
