class CpntItem extends HTMLElement {
  // eslint-disable-next-line class-methods-use-this
  get type() {
    throw new Error('type property must be overrided');
  }

  // eslint-disable-next-line class-methods-use-this
  get image() {
    throw new Error('image property must be overrided');
  }

  // eslint-disable-next-line class-methods-use-this
  get width() {
    throw new Error('width property must be overrided');
  }

  // eslint-disable-next-line class-methods-use-this
  get height() {
    throw new Error('height property must be overrided');
  }

  get computer() {
    return this._computer;
  }

  constructor(computer) {
    super();

    if (this.constructor === CpntItem) {
      throw new Error('CpntItem class can not be instantiated');
    }

    this._computer = computer;

    const img = new Image(this.width, this.height);
    img.src = this.image;
    this.append(img);

    img.addEventListener('mousedown', ev => {
      const rect = img.getBoundingClientRect();
      const top = ev.pageY - ev.clientY + rect.top;
      const left = ev.pageX - ev.clientX + rect.left;
      const cpnt = this.cpnt(top, left);

      computer.addCpnt(cpnt);
      cpnt.drag(ev);
    });
  }

  // eslint-disable-next-line no-unused-vars, class-methods-use-this
  cpnt(top, left) {
    throw new Error('cpnt method must be overrided');
  }
}

export default CpntItem;
