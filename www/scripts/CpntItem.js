class CpntItem extends HTMLElement {
  constructor(Cpnt, svg) {
    super();

    const image = new Image();

    image.src = svg.src;
    image.width = svg.width;
    image.height = svg.height;

    this.append(image);

    image.addEventListener('mousedown', ev => {
      const rect = this.getBoundingClientRect();

      const top = ev.pageY - ev.clientY + rect.top;
      const left = ev.pageX - ev.clientX + rect.left;

      const cpnt = new Cpnt(top, left);

      this.dispatchEvent(new CustomEvent('add', { detail: cpnt }));

      cpnt.drag(ev);
    });
  }
}

customElements.define('cpnt-item', CpntItem);

module.exports = CpntItem;
