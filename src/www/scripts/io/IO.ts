import Component from '../Component.js';
import Coords from '../ifaces/Coords.js';
import IOInfo from '../ifaces/IOInfo.js';

abstract class IO extends HTMLElement {
  private _name: string;
  private _value: number;
  private _default: number;
  private _changed: boolean;
  private readonly _coords: Coords;

  public readonly cpnt: Component;
  public readonly ioId: string;

  public get name (): string {
    return this._name;
  }

  public set name (value: string) {
    this._name = value;
    this.title = `${value} = ${this._value}`;
  }

  public get value (): number {
    return this._value;
  }

  public set value (value: number) {
    if (this._value !== value) {
      this._value = value;
      this._changed = true;
    }
    this.title = `${this._name} = ${value}`;
  }

  public get default (): number {
    return this._default;
  }

  public set default (value: number) {
    this._default = value;
  }

  public get changed (): boolean {
    const changed = this._changed;
    this._changed = false;
    return changed;
  }

  public get coords (): Coords {
    const x = this._coords.x + this.cpnt.left;
    const y = this._coords.y + this.cpnt.top;
    return { x, y };
  }

  public get x (): number {
    return this._coords.x;
  }

  public set x (value: number) {
    if (value !== this._coords.x) {
      this._coords.x = value;
      this.style.left = `${value - 5}px`;

      const ev = new Event('move', { bubbles: true });
      this.dispatchEvent(ev);
    }
  }

  public get y (): number {
    return this._coords.y;
  }

  public set y (value: number) {
    if (value !== this._coords.y) {
      this._coords.y = value;
      this.style.top = `${value - 5}px`;

      const ev = new Event('move', { bubbles: true });
      this.dispatchEvent(ev);
    }
  }

  public constructor (cpnt: Component, id: string, name: string, x: number, y: number) {
    super();

    this._name = name;
    this._value = 0;
    this._coords = { x: -1, y: -1 };

    this.cpnt = cpnt;
    this.ioId = id;
    this.name = this._name;

    this.x = Math.max(x, 0);
    this.y = Math.max(y, 0);

    this._changed = true;

    this._default = 0;

    this.classList.add('io');

    this.tabIndex = 0;
  }

  public reset (): void {
    this.value = this.default;
  }

  public serialize (): IOInfo {
    return {
      cpntId: this.cpnt.cpntId,
      ioId: this.ioId
    };
  }
}

export default IO;
