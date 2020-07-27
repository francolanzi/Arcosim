const MenuButton = require('../MenuButton');

class RunButton extends MenuButton {
  static get title() {
    return 'Ejecutar';
  }

  static get icon() {
    return 'img/menu/run.svg';
  }
}

customElements.define('run-button', RunButton);

module.exports = RunButton;
