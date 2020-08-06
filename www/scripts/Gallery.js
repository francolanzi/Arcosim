const fs = require('fs');
const path = require('path');

class Gallery extends HTMLElement {
  get open() {
    return this.classList.contains('open');
  }

  set open(open) {
    this.classList.toggle('open', open);
  }

  constructor() {
    super();

    fs.readdirSync(path.resolve(__dirname, 'cpnts')).forEach(file => {
      file = path.parse(file);
      if (file.ext === '.js') {
        const Cpnt = require(`./cpnts/${file.name}`);
        const item = Cpnt.getItem();

        item.addEventListener('add', ev =>
          this.dispatchEvent(new CustomEvent('add', { detail: ev.detail })));

        this.append(item);
      }
    });
  }
}

customElements.define('cpnt-gallery', Gallery);

module.exports = Gallery;
