const { readdirSync } = window.require('fs');
const { resolve } = window.require('path');

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
      const dir = resolve(__dirname, 'scripts/cpnts');
      const files = readdirSync(dir);
      for (const file of files) {
        if (file.split('.').pop() === 'js') {
          const Cpnt = (await import(`${dir}/${file}`)).default;
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
