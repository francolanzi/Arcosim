const fs = require('fs');

class ControlStoreRowButton extends HTMLElement {
  constructor(svg) {
    super();

    this.innerHTML = fs.readFileSync(svg);
  }
}

customElements.define('control-store-row-button', ControlStoreRowButton);

module.exports = ControlStoreRowButton;
