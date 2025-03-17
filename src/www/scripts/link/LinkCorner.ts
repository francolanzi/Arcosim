import Draggable from '../Draggable.js';
import Coords from '../ifaces/Coords.js';
import CornerInfo from '../ifaces/CornerInfo.js';

class LinkCorner extends Draggable {
  private readonly _coords: Coords;

  public get coords (): Coords {
    return { ...this._coords };
  }

  public constructor (x: number, y: number) {
    super(y - 5, x - 5);

    this._coords = { x, y };

    this.addEventListener('dblclick', () => {
      this.remove();
      this.dispatchEvent(new Event('remove'));
    });
  }

  public move (ev: MouseEvent): void {
    super.move(ev);

    this._coords.x = this.left + 5;
    this._coords.y = this.top + 5;
  }

  public serialize (): CornerInfo {
    return {
      x: this._coords.x,
      y: this._coords.y
    };
  }
}

customElements.define('link-corner', LinkCorner);

export default LinkCorner;
