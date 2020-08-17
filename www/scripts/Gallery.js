const CpntItem = require('./CpntItem');
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
        const item = new CpntItem(Cpnt.svg);

        item.addEventListener('mousedown', ev => {
          const rect = item.getBoundingClientRect();
          const top = ev.pageY - ev.clientY + rect.top;
          const left = ev.pageX - ev.clientX + rect.left;
          const cpnt = new Cpnt(top, left);
          this.dispatchEvent(new CustomEvent('add', { detail: cpnt }));
          cpnt.drag(ev);
        });

        this.append(item);
      }
    });
  }
}

customElements.define('cpnt-gallery', Gallery);

module.exports = Gallery;
