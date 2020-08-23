import MenuButton from '../MenuButton.js';

class TrashButton extends MenuButton {
  constructor() {
    const title = 'Eliminar';
    const icon = 'images/menu/trash.svg';

    super(title, icon);
  }
}

customElements.define('trash-button', TrashButton);

export default TrashButton;
