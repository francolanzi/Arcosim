abstract class MenuButton extends HTMLElement {
  private readonly _image: HTMLImageElement;

  public get icon(): string {
    return this._image.src;
  }

  public set icon(value: string) {
    this._image.src = value;
  }

  public get active(): boolean {
    return this.classList.contains('active');
  }

  public set active(value: boolean) {
    this.classList.toggle('active', value);
  }

  public constructor(title: string, icon: string) {
    super();

    this.setAttribute('is', 'menu-button');

    this._image = document.createElement('img');
    this.append(this._image);

    this.icon = icon;
    this.title = title;
  }
}

export default MenuButton;
