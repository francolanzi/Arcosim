import Component from '../Component.js';
import Link from '../link/Link.js';
import IO from './IO.js';

class Output extends IO {
  private _width: number;
  private _color: string;
  private _opacity: number;
  private _dashed: boolean;
  private readonly _links: Set<Link>;

  public get value(): number {
    return super.value;
  }

  public set value(value: number) {
    super.value = value;
    this.width = value ? 2 : 1;
    this._links.forEach(link => link.value = value);
  }

  public get default(): number {
    return super.default;
  }

  public set default(value: number) {
    super.default = value;
    this.value = value;
  }

  get width(): number {
    return this._width;
  }

  set width(value: number) {
    this._width = value;
    this._links.forEach(link => link.width = value);
  }

  get color(): string {
    return this._color;
  }

  set color(value: string) {
    this._color = value;
    this._links.forEach(link => link.color = value);
  }

  get opacity(): number {
    return this._opacity;
  }

  set opacity(value: number) {
    value = Math.max(Math.min(value, 1), 0);
    this._opacity = value;
    this._links.forEach(link => link.opacity = value);
  }

  get dashed(): boolean {
    return this._dashed;
  }

  set dashed(value: boolean) {
    this._dashed = value;
    this._links.forEach(link => link.dashed = value);
  }

  public get links(): IterableIterator<Link> {
    return this._links.values();
  }

  public constructor(cpnt: Component, id: string, name: string, x: number, y: number) {
    super(cpnt, id, name, x, y);

    this._links = new Set();

    this._width = 1;
    this._color = 'black';
    this._opacity = 1;
    this._dashed = false;

    this.width = this._width;
    this.color = this._color;
    this.opacity = this._opacity;
    this.dashed = this._dashed;

    let clicked = false;
    let focused = false;

    this.addEventListener('mousedown', () => {
      if (focused) {
        this.blur();
      } else {
        clicked = true;
      }
    });

    this.addEventListener('mouseup', () => clicked = false);

    this.addEventListener('focus', () => {
      if (clicked) {
        focused = true;
      } else {
        this.blur();
      }
    });

    this.addEventListener('blur', () => focused = false);
  }

  public addLink(link: Link): void {
    this._links.add(link);
    link.value = this.value;
    link.width = this.width;
    link.color = this.color;
    link.opacity = this.opacity;
    link.dashed = this.dashed;
  }

  public removeLink(link: Link): void {
    this._links.delete(link);
  }

  public remove(): void {
    this._links.forEach(link => link.remove());
    super.remove();
  }
}

customElements.define('cpnt-output', Output);

export default Output;
