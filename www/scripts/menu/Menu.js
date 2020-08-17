import TrashButton from './buttons/TrashButton.js';
import CpntButton from './buttons/CpntButton.js';
import RunButton from './buttons/RunButton.js';
import StepButton from './buttons/StepButton.js';
import ResetButton from './buttons/ResetButton.js';

class Menu extends HTMLElement {
  get computer() {
    return this._computer;
  }

  set computer(computer) {
    this._computer = computer;
    this.getButton('run').computer = computer;
    this.getButton('step').computer = computer;
    this.getButton('reset').computer = computer;
  }

  get gallery() {
    return this._gallery;
  }

  set gallery(gallery) {
    this._gallery = gallery;
    this.getButton('cpnt').gallery = gallery;
  }

  constructor() {
    super();

    this._buttons = new Map();

    this.addButton('trash', new TrashButton());
    this.addButton('cpnt', new CpntButton());
    this.addButton('run', new RunButton());
    this.addButton('step', new StepButton());
    this.addButton('reset', new ResetButton());
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
