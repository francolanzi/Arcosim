class ImgButton extends HTMLElement {
  public constructor(title: string, icon: string) {
    super();

    const image = document.createElement('img');
    image.src = icon;
    image.title = title;
    this.append(image);
  }
}

customElements.define('img-button', ImgButton);

export default ImgButton;
