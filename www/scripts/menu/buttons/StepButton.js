import MenuButton from '../MenuButton.js';

class StepButton extends MenuButton {
  static get title() {
    return 'Avanzar';
  }

  static get icon() {
    return 'images/menu/step.svg';
  }

  constructor(computer) {
    super();

    this.addEventListener('click', () => computer.step());
  }
}

customElements.define('step-button', StepButton);

export default StepButton;
