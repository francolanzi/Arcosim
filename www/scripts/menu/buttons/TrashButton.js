import MenuButton from '../MenuButton.js';

class TrashButton extends MenuButton {
  static get title() {
    return 'Eliminar';
  }

  static get icon() {
    return 'images/menu/trash.svg';
  }
}

customElements.define('trash-button', TrashButton);

export default TrashButton;
