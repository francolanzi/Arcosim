class Component extends HTMLElement {
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

    if (this.constructor == Component) {
      throw new Error('Component class can not be instantiated');
    }

    this.classList.add('cpnt-element');

    this._image = new Image();
    this.image.src = this.constructor.imageFile;
    this.appendChild(this.image);
  }
}

module.exports = Component;
