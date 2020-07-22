const MenuItem = require('../MenuItem');

class LinkItem extends MenuItem {
  static get title() {
    return 'Conectar';
  }

  static get icon() {
    return 'img/menu/link.svg';
  }

  get show() {
    return this._show;
  }

  constructor() {
    super();

    this._show = false;
    this.addEventListener('click', () => {
      this._show = !this._show;
      this.dispatchEvent(new CustomEvent('show', { detail: this._show }));
    });
  }
}

customElements.define('link-item', LinkItem);

module.exports = LinkItem;
