const MenuButton = require('../MenuButton');

class RunButton extends MenuButton {
  static get title() {
    return 'Ejecutar';
  }

  static get icon() {
    return 'img/menu/run.svg';
  }

  constructor() {
    super();

    this.addEventListener('click', () =>
      this.dispatchEvent(new Event('run')));
  }
}

customElements.define('run-button', RunButton);

module.exports = RunButton;
