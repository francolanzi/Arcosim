import TrashButton from './buttons/TrashButton.js';
import CpntButton from './buttons/CpntButton.js';
import RunButton from './buttons/RunButton.js';
import StepButton from './buttons/StepButton.js';
import ResetButton from './buttons/ResetButton.js';
import AboutButton from './buttons/AboutButton.js';

class Menu extends HTMLElement {
  constructor(computer, gallery) {
    super();

    this._buttons = new Map();

    this.addButton('trash', new TrashButton());
    this.addButton('cpnt', new CpntButton(gallery));
    this.addButton('run', new RunButton(computer));
    this.addButton('step', new StepButton(computer));
    this.addButton('reset', new ResetButton(computer));
    this.addButton('about', new AboutButton());
  }

  addButton(name, button) {
    if (!this._buttons.has(name)) {
      this._buttons.set(name, button);
      this.append(button);
    }
    return this.getButton(name);
  }

  getButton(name) {
    return this._buttons.get(name);
  }

  removeButton(name) {
    return this._buttons.delete(name);
  }
}

customElements.define('main-menu', Menu);

export default Menu;
