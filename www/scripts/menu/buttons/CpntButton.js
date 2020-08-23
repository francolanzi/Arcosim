import MenuButton from '../MenuButton.js';

class CpntButton extends MenuButton {
  constructor(gallery) {
    const title = 'Componentes';
    const icon = 'images/menu/cpnt.svg';

    super(title, icon);

    this.addEventListener('click', () => {
      gallery.open = !gallery.open;
      this.active = gallery.open;
    });
  }
}

customElements.define('cpnt-button', CpntButton);

export default CpntButton;
