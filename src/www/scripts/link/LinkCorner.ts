import Draggable from '../Draggable.js';
import Center from '../ifaces/Center.js';
import CornerInfo from '../ifaces/CornerInfo.js';

class LinkCorner extends Draggable {
  private readonly _center: Center;

  public get center(): Center {
    return { ...this._center };
  }

  public constructor(x: number, y: number) {
    super(y - 5, x - 5);

    this._center = { x, y };

    this.addEventListener('dblclick', () => {
      this.remove();
      this.dispatchEvent(new Event('remove'));
    });
  }

  public move(ev: MouseEvent): void {
    super.move(ev);

    this._center.x = this.left + 5;
    this._center.y = this.top + 5;
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
