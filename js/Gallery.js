const fs = require('fs');
const path = require('path');

class Gallery extends HTMLElement {
  get open() {
    return this.style.transform === 'scaleY(1)';
  }

  set open(open) {
    this.style.transform = 'scaleY(' + (open ? 1 : 0) + ')';
  }

  constructor() {
    super();

    this.style.transform = 'scaleY(0)';

    fs.readdirSync(path.resolve(__dirname, 'cpnts')).forEach(file => {
      file = path.parse(file);
      if (file.ext === '.js') {
        const Cpnt = require('./cpnts/' + file.name);
        const item = Cpnt.getItem();

        item.addEventListener('add', ev =>
          this.dispatchEvent(new CustomEvent('add', { detail: ev.detail })));

        this.appendChild(item);
      }
    });
  }
}

customElements.define('cpnt-gallery', Gallery);

module.exports = Gallery;
