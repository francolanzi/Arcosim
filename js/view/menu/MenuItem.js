class MenuItem extends HTMLElement {
  static get title() {
    throw new Error('title static property must be overrided');
  }

  static get icon() {
    throw new Error('icon static property must be overrided');
  }

  constructor() {
    super();

    if (this.constructor == MenuItem) {
      throw new Error('MenuItem class can not be instantiated');
    }

    this.classList.add('menu-item');

    this.setAttribute('title', this.constructor.title);

    const img = new Image();
    img.src = this.constructor.icon;

    this.appendChild(img);
  }
}

module.exports = MenuItem;
