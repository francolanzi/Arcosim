import Center from '../ifaces/Center.js';
import CornerInfo from '../ifaces/CornerInfo.js';

class LinkCorner extends HTMLElement {
  private readonly _center: Center;
  private readonly _mouse: Center;
  private readonly _move: (ev: MouseEvent) => void;
  private readonly _drop: () => void;

  public get center(): Center {
    return { ...this._center };
  }

  public constructor(x: number, y: number) {
    super();

    this._center = { x: 0, y: 0 };
    this._mouse = { x: 0, y: 0 };

    this._center.x = x;
    this._center.y = y;

    this.style.top = `${y - 5}px`;
    this.style.left = `${x - 5}px`;

    this._move = (ev: MouseEvent) => this.move(ev);
    this._drop = () => this.drop();

    this.addEventListener('mousedown', ev => this.drag(ev));
    this.addEventListener('dblclick', () => {
      this.remove();
      this.dispatchEvent(new Event('remove'));
    });
  }

  public drag(ev: MouseEvent): void {
    const rect = this.getBoundingClientRect();

    this._mouse.x = ev.clientX - rect.left - 5;
    this._mouse.y = ev.clientY - rect.top - 5;

    document.addEventListener('mousemove', this._move);
    document.addEventListener('mouseup', this._drop);

    this.dispatchEvent(new Event('drag'));
  }

  public move(ev: MouseEvent): void {
    this._center.x = Math.max(ev.pageX - this._mouse.x, 5);
    this._center.y = Math.max(ev.pageY - this._mouse.y, 5);

    this.style.top = `${this._center.y - 5}px`;
    this.style.left = `${this._center.x - 5}px`;

    this.dispatchEvent(new Event('move'));
  }

  public drop(): void {
    document.removeEventListener('mousemove', this._move);
    document.removeEventListener('mouseup', this._drop);

    this.dispatchEvent(new Event('drop'));
  }

  public serialize(): CornerInfo {
    return {
      x: this._center.x,
      y: this._center.y,
    };
  }
}

customElements.define('link-corner', LinkCorner);

export default LinkCorner;
