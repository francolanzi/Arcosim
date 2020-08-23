import MenuButton from '../MenuButton.js';

class StepButton extends MenuButton {
  constructor(computer) {
    const title = 'Avanzar';
    const icon = 'images/menu/step.svg';

    super(title, icon);

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
