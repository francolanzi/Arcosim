const { readdirSync } = window.require('fs');
const { resolve, parse } = window.require('path');

class Gallery extends HTMLElement {
  get open() {
    return this.classList.contains('open');
  }

  set open(open) {
    this.classList.toggle('open', open);
  }

  constructor() {
    super();

    (async () => {
      const files = readdirSync(resolve(__dirname, 'scripts/cpnts'));
      for (const path of files) {
        const file = parse(path);
        if (file.ext === '.js') {
          const Cpnt = (await import(`../cpnts/${file.name}.js`)).default;
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
      }
    })();
  }
}

customElements.define('cpnt-gallery', Gallery);

export default Gallery;
