import MenuButton from '../MenuButton.js';

class ResetButton extends MenuButton {
  static get title() {
    return 'Reiniciar';
  }

  static get icon() {
    return 'images/menu/reset.svg';
  }

  constructor(computer) {
    super();

    this.addEventListener('click', () => computer.reset());
  }
}

customElements.define('reset-button', ResetButton);

export default ResetButton;
