import MenuButton from '../MenuButton.js';

class ResetButton extends MenuButton {
  constructor(computer) {
    const title = 'Reiniciar';
    const icon = 'images/menu/reset.svg';

    super(title, icon);

    this.addEventListener('click', () => computer.reset());
  }
}

customElements.define('reset-button', ResetButton);

export default ResetButton;
