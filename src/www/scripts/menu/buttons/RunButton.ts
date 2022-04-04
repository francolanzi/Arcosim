import Computer from '../../Computer.js';
import MenuButton from '../MenuButton.js';

class RunButton extends MenuButton {
  public constructor (computer: Computer) {
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
      this.icon = 'images/menu/stop.svg';
      document.documentElement.style.cursor = 'progress';
    });
    computer.addEventListener('stop', () => {
      this.active = false;
      this.icon = 'images/menu/run.svg';
      document.documentElement.style.cursor = 'auto';
    });
  }
}

customElements.define('run-button', RunButton);

export default RunButton;
