class Gallery extends HTMLElement {
  get open() {
    return this.classList.contains('open');
  }

  set open(open) {
    this.classList.toggle('open', open);
  }

  constructor(computer) {
    super();

    computer.items().then(items => {
      items.forEach(item =>
        this.append(item));
    });
  }
}

customElements.define('cpnt-gallery', Gallery);

export default Gallery;
