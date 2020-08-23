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

    this.addEventListener('click', () => {
      if (!computer.stepping) {
        computer.step();
      }
    });

    computer.addEventListener('step', () => {
      this.active = true;
      document.documentElement.style.cursor = 'progress';
    });
    computer.addEventListener('pause', () => {
      this.active = false;
      document.documentElement.style.cursor = 'auto';
    });
  }
}

customElements.define('step-button', StepButton);

export default StepButton;
