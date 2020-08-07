const MenuButton = require('../MenuButton');

class RunButton extends MenuButton {
  static get title() {
    return 'Ejecutar';
  }

  static get icon() {
    return 'images/menu/run.svg';
  }

  get computer() {
    return this._computer;
  }

  set computer(computer) {
    this._computer = computer;

    computer.addEventListener('run', () => this.active = true);
    computer.addEventListener('stop', () => this.active = false);
  }

  constructor() {
    super();

    this.addEventListener('click', () => {
      if (this.computer) {
        if (this.computer.running) {
          this.computer.stop();
        } else {
          this.computer.run();
        }
      }
    });
  }
}

customElements.define('run-button', RunButton);

module.exports = RunButton;
