import MenuButton from '../MenuButton.js';

class RunButton extends MenuButton {
  static get title() {
    return 'Ejecutar';
  }

  static get icon() {
    return 'images/menu/run.svg';
  }

  constructor(computer) {
    super();

    this.addEventListener('click', () => {
      if (computer.running) {
        computer.stop();
      } else {
        computer.run();
      }
    });

    computer.addEventListener('run', () => this.active = true);
    computer.addEventListener('stop', () => this.active = false);
  }
}

customElements.define('run-button', RunButton);

export default RunButton;
