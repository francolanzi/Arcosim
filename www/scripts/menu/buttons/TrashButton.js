const MenuButton = require('../MenuButton');

class TrashButton extends MenuButton {
  static get title() {
    return 'Eliminar';
  }

  static get icon() {
    return 'images/menu/trash.svg';
  }
}

customElements.define('trash-button', TrashButton);

module.exports = TrashButton;