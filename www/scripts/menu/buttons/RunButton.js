import MenuButton from '../MenuButton.js';

class RunButton extends MenuButton {
  constructor(computer) {
    const title = 'Ejecutar';
    const icon = 'images/menu/run.svg';

    super(title, icon);

    this.addEventListener('click', () => {
      if (computer.running) {
        computer.stop();
      } else {
        computer.run();
      }
    });

    computer.addEventListener('run', () => {
      this.active = true;
      document.documentElement.style.cursor = 'progress';
    });
    computer.addEventListener('stop', () => {
      this.active = false;
      document.documentElement.style.cursor = 'auto';
    });
  }
}

customElements.define('run-button', RunButton);

export default RunButton;
