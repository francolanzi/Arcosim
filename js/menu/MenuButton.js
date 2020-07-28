const fs = require('fs');

class MenuButton extends HTMLElement {
  static get title() {
    throw new Error('title static property must be overrided');
  }

  static get icon() {
    throw new Error('icon static property must be overrided');
  }

  get active() {
    return this.classList.contains('active');
  }

  set active(active) {
    this.classList.toggle('active', active);
  }

  constructor() {
    super();

    if (this.constructor === MenuButton) {
      throw new Error('MenuButton class can not be instantiated');
    }

    this.classList.add('menu-button');

    this.title = this.constructor.title;

    this.innerHTML = fs.readFileSync(this.constructor.icon);
  }
}

module.exports = MenuButton;
