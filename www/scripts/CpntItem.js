class CpntItem extends HTMLElement {
  constructor(svg) {
    super();

    const image = new Image();

    image.src = svg.src;
    image.width = svg.width;
    image.height = svg.height;

    this.append(image);
  }
}

customElements.define('cpnt-item', CpntItem);

module.exports = CpntItem;
