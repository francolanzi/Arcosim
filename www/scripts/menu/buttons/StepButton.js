import MenuButton from '../MenuButton.js';

class StepButton extends MenuButton {
  static get title() {
    return 'Avanzar';
  }

  static get icon() {
    return 'images/menu/step.svg';
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
        this.computer.step();
      }
    });
  }
}

customElements.define('step-button', StepButton);

export default StepButton;
