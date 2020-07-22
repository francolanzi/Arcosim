const fs = require('fs');
const path = require('path');

const StyledElement = require('./StyledElement');

class Gallery extends StyledElement {
  get open() {
    return this.style.transform === 'scaleY(1)';
  }

  set open(open) {
    this.style.transform = 'scaleY(' + (open ? 1 : 0) + ')';
  }

  constructor() {
    super();

    this.addStyles('css/Gallery.css');

    this.style.transform = 'scaleY(0)';

    fs.readdirSync(path.resolve(__dirname, 'cpnts')).forEach(file => {
      file = path.parse(file);
      if (file.ext === '.js') {
        const Component = require('./cpnts/' + file.name);
        const cpnt = new Component();

        cpnt.addEventListener('add', ev =>
          this.dispatchEvent(new CustomEvent('add', { detail: ev.detail })));

        this.appendChild(cpnt);
      }
    });
  }
}

customElements.define('cpnt-gallery', Gallery);

module.exports = Gallery;
