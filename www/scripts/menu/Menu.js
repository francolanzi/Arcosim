const TrashButton = require('./items/TrashButton');
const LinkButton = require('./items/LinkButton');
const CpntButton = require('./items/CpntButton');
const RunButton = require('./items/RunButton');
const ResetButton = require('./items/ResetButton');

class Menu extends HTMLElement {
  constructor() {
    super();

    this._buttons = new Map();

    this.addButton('trash', new TrashButton());
    this.addButton('link', new LinkButton());
    this.addButton('cpnt', new CpntButton());
    this.addButton('run', new RunButton());
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

module.exports = Menu;
