const MenuButton = require('../MenuButton');

class LinkButton extends MenuButton {
  static get title() {
    return 'Conectar';
  }

  static get icon() {
    return 'www/images/menu/link.svg';
  }

  get show() {
    return this._show;
  }

  constructor() {
    super();

    this._show = false;
    this.addEventListener('click', () => {
      this._show = !this._show;
      this.active = this._show;
      this.dispatchEvent(new CustomEvent('show', { detail: this._show }));
    });
  }
}

customElements.define('link-button', LinkButton);

module.exports = LinkButton;
