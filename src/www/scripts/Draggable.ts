import Center from './ifaces/Center.js';

abstract class Draggable extends HTMLElement {
  private _top: number;
  private _left: number;

  private readonly _move: (ev: MouseEvent) => void;
  private readonly _drop: (ev: MouseEvent) => void;
  private readonly _mouse: Center;

  public get top(): number {
    return this._top;
  }

  public set top(value: number) {
    this._top = value;
    this.style.top = `${value}px`;
  }

  public get left(): number {
    return this._left;
  }

  public set left(value: number) {
    this._left = value;
    this.style.left = `${value}px`;
  }

  public constructor(top: number, left: number) {
    super();

    this._top = top;
    this._left = left;

    this.top = this._top;
    this.left = this._left;

    this._mouse = { x: 0, y: 0 };

    this._move = ev => this.move(ev);
    this._drop = ev => this.drop(ev);

    this.addEventListener('mousedown', ev => this.drag(ev));
  }

  public drag(ev: MouseEvent): void {
    const rect = this.getBoundingClientRect();

    this._mouse.x = ev.clientX - rect.left;
    this._mouse.y = ev.clientY - rect.top;

    document.addEventListener('mousemove', this._move);
    document.addEventListener('mouseup', this._drop);

    this.dispatchEvent(new Event('drag'));
  }

  public move(ev: MouseEvent): void {
    this.top = Math.max(ev.pageY - this._mouse.y, 0);
    this.left = Math.max(ev.pageX - this._mouse.x, 0);

    this.dispatchEvent(new Event('move'));
  }

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  public drop(ev: MouseEvent): void {
    document.removeEventListener('mousemove', this._move);
    document.removeEventListener('mouseup', this._drop);

    this.dispatchEvent(new Event('drop'));
  }
}

export default Draggable;
