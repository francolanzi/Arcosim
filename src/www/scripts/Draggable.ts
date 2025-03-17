import Coords from './ifaces/Coords.js';

abstract class Draggable extends HTMLElement {
  private _top: number;
  private _left: number;
  private _handle: HTMLElement;
  private _area: HTMLElement;

  private readonly _drag: (ev: MouseEvent) => void;
  private readonly _move: (ev: MouseEvent) => void;
  private readonly _drop: (ev: MouseEvent) => void;
  private readonly _mouse: Coords;

  public get top (): number {
    return this._top;
  }

  public set top (value: number) {
    this._top = value;
    this.style.top = `${value}px`;

    const { top, bottom } = this.getBoundingClientRect();

    this._top -= Math.min(top - this._area.offsetTop + this._area.scrollTop, 0);
    this._top -= Math.max(bottom - this._area.scrollHeight, 0);
    this.style.top = `${value}px`;
  }

  public get left (): number {
    return this._left;
  }

  public set left (value: number) {
    this._left = value;
    this.style.left = `${value}px`;

    const { left, right } = this.getBoundingClientRect();

    this._left -= Math.min(left - this._area.offsetLeft + this._area.scrollLeft, 0);
    this._left -= Math.max(right - this._area.scrollWidth, 0);
    this.style.left = `${value}px`;
  }

  public get handle (): HTMLElement {
    return this._handle;
  }

  public set handle (value: HTMLElement) {
    this._handle.removeEventListener('mousedown', this._drag);
    this._handle.style.removeProperty('cursor');
    this._handle = value;
    this._handle.addEventListener('mousedown', this._drag);
    this._handle.style.cursor = 'move';
  }

  public get area (): HTMLElement {
    return this._area;
  }

  public set area (value: HTMLElement) {
    this._area = value;
    this.top = this._top;
    this.left = this._left;
  }

  public constructor (top: number, left: number) {
    super();

    this._mouse = { x: 0, y: 0 };

    this._drag = ev => this.drag(ev);
    this._move = ev => this.move(ev);
    this._drop = ev => this.drop(ev);

    this._handle = this;
    this.handle = this._handle;

    this._area = document.documentElement;
    this.area = this._area;

    this._top = top;
    this._left = left;

    this.top = this._top;
    this.left = this._left;

    window.addEventListener('resize', () => {
      this.top = this._top;
      this.left = this._left;
    });
  }

  public drag (ev: MouseEvent): void {
    this._mouse.x = ev.pageX;
    this._mouse.y = ev.pageY;

    document.addEventListener('mousemove', this._move);
    document.addEventListener('mouseup', this._drop);

    this.dispatchEvent(new Event('drag'));
  }

  public move (ev: MouseEvent): void {
    this.top = this.top + ev.pageY - this._mouse.y;
    this.left = this.left + ev.pageX - this._mouse.x;

    this._mouse.x = ev.pageX;
    this._mouse.y = ev.pageY;

    this.dispatchEvent(new Event('move'));
  }

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  public drop (ev: MouseEvent): void {
    document.removeEventListener('mousemove', this._move);
    document.removeEventListener('mouseup', this._drop);

    this.dispatchEvent(new Event('drop'));
  }
}

export default Draggable;
