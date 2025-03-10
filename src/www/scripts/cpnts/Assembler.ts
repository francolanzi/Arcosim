import Component from '../Component.js';
import CpntItem from '../CpntItem.js';
import AssemblerData from '../ifaces/data/AssemblerData.js';
import Mask from '../ifaces/Mask.js';
import Input from '../io/Input.js';
import Output from '../io/Output.js';
import Config from '../modal/Assembler/Config.js';

class Assembler extends Component {
  private readonly _masks: Array<{ input: Input, size: number }>;

  private readonly _value: Output;
  private readonly _clock: Input;

  public get config (): Config {
    return new Config(this);
  }

  public get count (): number {
    return this._masks.length;
  }

  public get masks (): IterableIterator<Mask> {
    return this._masks.map(mask => {
      return { name: mask.input.name, size: mask.size };
    }).values();
  }

  public constructor (item: CpntItem, top: number, left: number) {
    super(item, top, left);

    this._masks = [];

    this._value = this.addOutput('value', 'Valor', 164.5, 42);
    this._clock = this.addInput('clock', 'Clock', 0, 21);

    this._clock.default = 1;

    this.addMask('', 1);
  }

  public run (time: number): boolean {
    if (this._clock.value) {
      let value = 0;

      for (let i = 0; i < this._masks.length; i++) {
        value <<= this._masks[i].size;
        value |= this._masks[i].input.value;
      }

      this._value.value = value;
    }

    return super.run(time);
  }

  public export (): AssemblerData {
    return {
      masks: this._masks.map(mask => {
        return {
          name: mask.input.name,
          size: mask.size
        };
      })
    };
  }

  public import (data: AssemblerData): void {
    if (data.masks) {
      this._masks.length = 0;
      data.masks.forEach(({ name, size }) =>
        this.addMask(name, size));
    }
  }

  public addMask (name: string, size: number): number {
    if (size > 0) {
      const id = `mask${this.count + 1}`;
      const input = this.addInput(id, name, 0, 0);
      this._masks.push({ input, size });
      this.makeMasks();
    }
    return this._masks.length - 1;
  }

  public getMask (index: number): Mask | undefined {
    const mask = this._masks[index];
    if (!mask) {
      return undefined;
    } else {
      const name = mask.input.name;
      const size = mask.size;
      return { name, size };
    }
  }

  public setMask (index: number, name: string, size: number): void {
    if (index >= 0 && index < this._masks.length) {
      const mask = this._masks[index];
      mask.input.name = name;
      mask.size = size;
      this.makeMasks();
    }
  }

  public removeMask (): number {
    if (this.count > 1) {
      const mask = this._masks.pop();
      if (mask) {
        this.removeInput(mask.input.ioId);
        this.makeMasks();
      }
    }
    return this.count;
  }

  public makeMasks (): void {
    const space = 329 / (this._masks.length + 1);

    let x = 0;
    this._masks.forEach(mask => {
      x += space;
      mask.input.x = x;
    });
  }
}

class AssemblerItem extends CpntItem {
  public get type (): string {
    return 'Assembler';
  }

  public get image (): string {
    return 'images/cpnt/Assembler.svg';
  }

  public get width (): number {
    return 330;
  }

  public get height (): number {
    return 43;
  }

  public get defaultLabel (): string {
    return 'Assembler';
  }

  public get labelRect (): DOMRectReadOnly {
    return new DOMRectReadOnly(1, 1, 328, 41);
  }

  public cpnt (top: number, left: number): Component {
    return new Assembler(this, top, left);
  }
}

customElements.define('cpnt-assembler', Assembler);
customElements.define('cpnt-item-assembler', AssemblerItem);

export { Assembler, AssemblerItem };
