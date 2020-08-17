import MenuButton from '../MenuButton.js';

class CpntButton extends MenuButton {
  static get title() {
    return 'Componentes';
  }

  static get icon() {
    return 'images/menu/cpnt.svg';
  }

  constructor(gallery) {
    super();

    this.addEventListener('click', () => {
      gallery.open = !gallery.open;
      this.active = gallery.open;
    });
  }
}

customElements.define('cpnt-button', CpntButton);

export default CpntButton;
