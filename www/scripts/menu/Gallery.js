import Computer from '../Computer.js';

class Gallery extends HTMLElement {
  get open() {
    return this.classList.contains('open');
  }

  set open(open) {
    this.classList.toggle('open', open);
  }

  constructor(computer) {
    super();

    Computer.cpntClasses().then(classes => {
      classes.forEach(Cpnt => {
        const image = new Image(Cpnt.svg.width, Cpnt.svg.height);

        image.src = Cpnt.svg.src;
        this.append(image);

        image.addEventListener('mousedown', ev => {
          const rect = image.getBoundingClientRect();
          const top = ev.pageY - ev.clientY + rect.top;
          const left = ev.pageX - ev.clientX + rect.left;
          const cpnt = new Cpnt(computer, top, left);

          computer.addCpnt(cpnt);
          cpnt.addEventListener('remove', () =>
            computer.removeCpnt(Cpnt.type, cpnt.id));

          cpnt.drag(ev);
        });
      });
    });
  }
}

customElements.define('cpnt-gallery', Gallery);

export default Gallery;
