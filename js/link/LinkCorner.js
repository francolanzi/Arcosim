class LinkCorner extends HTMLElement {
  get center() {
    return { ...this._center };
  }

  constructor(x, y) {
    super();

    this._center = { x, y };

    this.style.top = (y - 5) + 'px';
    this.style.left = (x - 5) + 'px';

    this._mouse = { x: 0, y: 0 };

    this._mousedown = this.drag.bind(this);
    this._mousemove = this.move.bind(this);
    this._mouseup = this.drop.bind(this);

    this.addEventListener('mousedown', this._mousedown);
    this.addEventListener('dblclick', () => {
      this.remove();
      this.dispatchEvent(new Event('remove'));
    });
  }

  drag(ev) {
    const rect = this.getBoundingClientRect();

    this._mouse.x = ev.clientX - rect.left - 5;
    this._mouse.y = ev.clientY - rect.top - 5;

    document.addEventListener('mousemove', this._mousemove);
    document.addEventListener('mouseup', this._mouseup);

    this.dispatchEvent(new Event('drag'));
  }

  move(ev) {
    this._center.x = Math.max(ev.pageX - this._mouse.x, 5);
    this._center.y = Math.max(ev.pageY - this._mouse.y, 5);

    this.style.top = (this._center.y - 5) + 'px';
    this.style.left = (this._center.x - 5) + 'px';

    this.dispatchEvent(new Event('move'));
  }

  drop() {
    document.removeEventListener('mousemove', this._mousemove);
    document.removeEventListener('mouseup', this._mouseup);

    this.dispatchEvent(new Event('drop'));
  }
}

customElements.define('link-corner', LinkCorner);

module.exports = LinkCorner;
