const fs = require('fs');

class MicroInstructionRegisterMaskButton extends HTMLElement {
  constructor(svg) {
    super();

    this.innerHTML = fs.readFileSync(svg);
  }
}

customElements.define('cpnt-mir-mask-button', MicroInstructionRegisterMaskButton);

module.exports = MicroInstructionRegisterMaskButton;
