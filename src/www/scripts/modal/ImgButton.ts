class ImgButton extends HTMLElement {
  public constructor(src: string) {
    super();

    const image = document.createElement('img');
    image.src = src;
    this.append(image);
  }
}

customElements.define('img-button', ImgButton);

export default ImgButton;
