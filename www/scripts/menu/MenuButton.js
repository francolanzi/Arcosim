class MenuButton extends HTMLElement {
  get icon() {
    return this._image.src;
  }

  set icon(icon) {
    this._image.src = icon;
  }

  get active() {
    return this.classList.contains('active');
  }

  set active(active) {
    this.classList.toggle('active', active);
  }

  constructor(title, icon) {
    super();

    if (this.constructor === MenuButton) {
      throw new Error('MenuButton class can not be instantiated');
    }

    this.classList.add('menu-button');

    this._image = document.createElement('img');
    this.append(this._image);

    this.icon = icon;
    this.title = title;
  }
}

export default MenuButton;
