import Component from '../Component.js';
import Center from '../ifaces/Center.js';

abstract class IO extends HTMLElement {
  private _name: string;
  private _value: number;
  private _changed: boolean;
  private readonly _center: Center;

  private _default: number;
  public readonly cpnt: Component;

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
    this.title = `${value} = ${this._value}`;
  }

  public get value(): number {
    return this._value;
  }

  public set value(value: number) {
    if (this._value !== value) {
      this._value = value;
      this._changed = true;
    }
    this.title = `${this._name} = ${value}`;
  }

  public get default(): number {
    return this._default;
  }

  public set default(value: number) {
    this._default = value;
  }

  public get changed(): boolean {
    const changed = this._changed;
    this._changed = false;
    return changed;
  }

  public get center(): Center {
    const x = this._center.x + this.cpnt.left;
    const y = this._center.y + this.cpnt.top;
    return { x, y };
  }

  public get x(): number {
    return this._center.x;
  }

  public set x(value: number) {
    if (value !== this._center.x) {
      this._center.x = value;
      this.style.left = `${value - 5}px`;

      const ev = new Event('move', { bubbles: true });
      this.dispatchEvent(ev);
    }
  }

  public get y(): number {
    return this._center.y;
  }

  public set y(value: number) {
    if (value !== this._center.x) {
      this._center.y = value;
      this.style.top = `${value - 5}px`;

      const ev = new Event('move', { bubbles: true });
      this.dispatchEvent(ev);
    }
  }

  public constructor(cpnt: Component, name: string, x: number, y: number) {
    super();

    this._name = name;
    this._center = { x: -1, y: -1 };

    this.cpnt = cpnt;
    this.name = this._name;

    this.x = Math.max(x, 0);
    this.y = Math.max(y, 0);

    this._value = 0;
    this._changed = true;

    this._default = 0;

    this.classList.add('io');

    this.tabIndex = 0;
  }

  public reset(): void {
    this.value = this.default;
  }
}

export default IO;
