class ImgButton extends HTMLElement {
  constructor(src) {
    super();

    const image = document.createElement('img');
    image.src = src;
    this.append(image);
  }
}

customElements.define('img-button', ImgButton);

module.exports = ImgButton;
