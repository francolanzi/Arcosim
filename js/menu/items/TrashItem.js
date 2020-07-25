const MenuItem = require('../MenuItem');

class TrashItem extends MenuItem {
  static get title() {
    return 'Eliminar';
  }

  static get icon() {
    return 'img/menu/trash.svg';
  }
}

customElements.define('trash-item', TrashItem);

module.exports = TrashItem;
