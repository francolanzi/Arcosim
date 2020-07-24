const IOElement = require('./IO');
const OutputElement = require('./Output');

class InputElement extends IOElement {
  constructor(cpnt, name, x, y) {
    super(cpnt, name, x, y);

    let linked = false;
    let clicked = false;

    this.addEventListener('mousedown', () => clicked = true);
    this.addEventListener('mouseup', () => clicked = false);

    this.addEventListener('focus', ev => {
      const output = ev.relatedTarget;
      this.blur();

      if (clicked) {
        if (linked) {
          linked = false;
          this.dispatchEvent(new Event('unlink'));
        } else if (output && output.constructor == OutputElement) {
          linked = true;
          this.dispatchEvent(new CustomEvent('link', { detail: output }));
        }
      }
    });
  }
}

customElements.define('cpnt-input', InputElement);

module.exports = InputElement;
