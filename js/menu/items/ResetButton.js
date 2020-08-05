const MenuButton = require('../MenuButton');

class ResetButton extends MenuButton {
  static get title() {
    return 'Reiniciar';
  }

  static get icon() {
    return 'img/menu/reset.svg';
  }

  constructor() {
    super();

    this.addEventListener('click', () =>
      this.dispatchEvent(new Event('reset')));
  }
}

customElements.define('reset-button', ResetButton);

module.exports = ResetButton;
