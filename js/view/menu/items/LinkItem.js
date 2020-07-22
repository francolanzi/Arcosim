const MenuItem = require('../MenuItem');

class LinkItem extends MenuItem {
  static get title() {
    return 'Conectar';
  }

  static get icon() {
    return 'img/menu/link.svg';
  }
}

customElements.define('link-item', LinkItem);

module.exports = LinkItem;
