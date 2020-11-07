import Computer from '../Computer.js';

class Gallery extends HTMLElement {
  public get open(): boolean {
    return this.classList.contains('open');
  }

  public set open(open: boolean) {
    this.classList.toggle('open', open);
  }

  public constructor(computer: Computer) {
    super();

    for (const item of computer.items) {
      this.append(item);
    }
  }

}

customElements.define('cpnt-gallery', Gallery);

export default Gallery;
