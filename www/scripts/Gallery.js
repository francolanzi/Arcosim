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
        const image = new Image(Cpnt.svg.width, Cpnt.svg.height);

        image.src = Cpnt.svg.src;
        this.append(image);

        image.addEventListener('mousedown', ev => {
          const rect = image.getBoundingClientRect();
          const top = ev.pageY - ev.clientY + rect.top;
          const left = ev.pageX - ev.clientX + rect.left;
          const cpnt = new Cpnt(top, left);
          this.dispatchEvent(new CustomEvent('add', { detail: cpnt }));
          cpnt.drag(ev);
        });
      }
    });
  }
}

customElements.define('cpnt-gallery', Gallery);

module.exports = Gallery;
