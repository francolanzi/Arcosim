const MenuButton = require('../MenuButton');

class ResetButton extends MenuButton {
  static get title() {
    return 'Reiniciar';
  }

  static get icon() {
    return 'images/menu/reset.svg';
  }

  get computer() {
    return this._computer;
  }

  set computer(computer) {
    this._computer = computer;
  }

  constructor() {
    super();

    this.addEventListener('click', () => {
      if (this.computer) {
        this.computer.reset();
      }
    });
  }
}

customElements.define('reset-button', ResetButton);

module.exports = ResetButton;
