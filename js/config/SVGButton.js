const fs = require('fs');

class SVGButton extends HTMLElement {
  constructor(svg) {
    super();

    this.innerHTML = fs.readFileSync(svg);
  }
}

customElements.define('svg-button', SVGButton);

module.exports = SVGButton;
