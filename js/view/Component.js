const InputElement = require('./io/Input');
const OutputElement = require('./io/Output');

class CpntElement extends HTMLElement {
  static get type() {
    throw new Error('type static property must be overrided');
  }

  static get imageFile() {
    throw new Error('imageFile static property must be overrided');
  }

  get image() {
    return this._image;
  }

  constructor() {
    super();

    if (this.constructor == CpntElement) {
      throw new Error('CpntElement class can not be instantiated');
    }

    this.classList.add('cpnt-element');

    this._image = new Image();
    this.image.src = this.constructor.imageFile;
    this.appendChild(this.image);
  }
}

class CpntOriginal extends CpntElement {
  static get instance() {
    throw new Error('instance static property must be overrided');
  }

  constructor() {
    super();

    if (this.constructor == CpntOriginal) {
      throw new Error('CpntOriginal class can not be instantiated');
    }

    this.classList.add('cpnt-original');

    this.image.addEventListener('mousedown', ev => {
      const rect = this.getBoundingClientRect();

      const top = ev.pageY - ev.clientY + rect.top;
      const left = ev.pageX - ev.clientX + rect.left;

      const Instance = this.constructor.instance;
      const cpnt = new Instance(top, left);

      this.dispatchEvent(new CustomEvent('add', { detail: cpnt }));

      cpnt.drag(ev);
    });
  }
}

class CpntInstance extends CpntElement {
  get cpnt() {
    return this._cpnt;
  }

  set cpnt(cpnt) {
    this._cpnt = cpnt;

    this._inputs.clear();
    this._outputs.clear();
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

  get showIO() {
    return this._showIO;
  }

  set showIO(show) {
    this._showIO = show;
    this._inputs.forEach(input => input.show = show);
    this._outputs.forEach(input => input.show = show);
  }

  get inputs() {
    return this._inputs.values();
  }

  get outputs() {
    return this._outputs.values();
  }

  constructor(top, left) {
    super();

    if (this.constructor == CpntInstance) {
      throw new Error('CpntInstance class can not be instantiated');
    }

    this.classList.add('cpnt-instance');

    this.style.position = 'absolute';
    this.style.top = top + 'px';
    this.style.left = left + 'px';

    this._top = top;
    this._left = left;

    this._showIO = false;

    this._inputs = new Map();
    this._outputs = new Map();

    this._mouse = {};
    this._mouse.x = null;
    this._mouse.y = null;

    this._mousedown = this.drag.bind(this);
    this._mousemove = this.move.bind(this);
    this._mouseup = this.drop.bind(this);

    this.image.addEventListener('mousedown', this._mousedown);
  }

  drag(ev) {
    const rect = this.getBoundingClientRect();

    this._mouse.x = ev.clientX - rect.left;
    this._mouse.y = ev.clientY - rect.top;

    document.addEventListener('mousemove', this._mousemove);
    document.addEventListener('mouseup', this._mouseup);

    this.classList.add('dragging');

    this.dispatchEvent(new Event('drag'));
  }

  move(ev) {
    this._top = Math.max(ev.pageY - this._mouse.y, 0);
    this._left = Math.max(ev.pageX - this._mouse.x, 0);

    this.style.top = this.top + 'px';
    this.style.left = this.left + 'px';

    if (this.trashed(ev)) {
      this.style.filter = 'invert(1)';
    } else {
      this.style.filter = 'none';
    }

    this.dispatchEvent(new Event('move'));
  }

  drop(ev) {
    document.removeEventListener('mousemove', this._mousemove);
    document.removeEventListener('mouseup', this._mouseup);

    this._mouse.x = null;
    this._mouse.y = null;

    this.parentElement.style.width = '';
    this.parentElement.style.height = '';

    this.classList.remove('dragging');

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

  addInput(id, x, y) {
    if (!this._inputs.has(id)) {
      const input = new InputElement(this, id, x, y);

      this._inputs.set(id, input);
      this.appendChild(input);

      input.addEventListener('link', ev =>
        this.dispatchEvent(new CustomEvent('link', {
          detail: { input, output: ev.detail },
        })));

      input.addEventListener('unlink', () =>
        this.dispatchEvent(new CustomEvent('unlink', { detail: input })));
    }
    return this.getInput(id);
  }

  addOutput(id, x, y) {
    if (!this._outputs.has(id)) {
      const output = new OutputElement(this, id, x, y);

      this._outputs.set(id, output);
      this.appendChild(output);
    }
    return this.getOutput(id);
  }

  getInput(id) {
    return this._inputs.get(id);
  }

  getOutput(id) {
    return this._outputs.get(id);
  }

  removeInput(id) {
    return this._inputs.delete(id);
  }

  removeOutput(id) {
    return this._outputs.delete(id);
  }
}

module.exports =
{
  CpntOriginal,
  CpntInstance,
};
