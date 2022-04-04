import About from '../../modal/About/About.js';
import MenuButton from '../MenuButton.js';

class AboutButton extends MenuButton {
  public constructor () {
    const title = 'Acerca de';
    const icon = 'images/menu/about.svg';

    super(title, icon);

    this.addEventListener('click', () => {
      const init = {
        detail: {
          title: 'Acerca de',
          content: new About()
        },
        bubbles: true
      };
      const ev = new CustomEvent('modal', init);
      this.dispatchEvent(ev);
    });
  }
}

customElements.define('about-button', AboutButton);

export default AboutButton;
