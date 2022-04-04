import Computer from '../../Computer.js';
import FileManager from '../../FileManager.js';
import MenuButton from '../MenuButton.js';

class NewButton extends MenuButton {
  public constructor (computer: Computer) {
    const title = 'Nuevo';
    const icon = 'images/menu/new.svg';

    super(title, icon);

    this.addEventListener('click', () =>
      FileManager.new(computer));
  }
}

customElements.define('new-button', NewButton);

export default NewButton;
