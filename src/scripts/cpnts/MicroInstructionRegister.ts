import Component from '../Component.js';
import CpntItem from '../CpntItem.js';
import MicroInstructionRegisterInfo from '../ifaces/cpntInfo/MicroInstructionRegisterInfo.js';
import Input from '../io/Input.js';
import Output from '../io/Output.js';
import Config from '../modal/MicroInstructionRegister/Config.js';

interface Mask {
  name: string,
  size: number,
}

class MicroInstructionRegister extends Component {
  private readonly _masks: Array<{ output: Output, size: number }>;

  private readonly _instruction: Input;
  private readonly _clock: Input;

  public get config(): Config {
    return new Config(this);
  }

  public get count(): number {
    return this._masks.length;
  }

  public constructor(item: CpntItem, top: number, left: number) {
    super(item, top, left);

    this._masks = [];

    this._instruction = this.addInput('instruction', 'Instrucción', 164.5, 0);
    this._clock = this.addInput('clock', 'Clock', 0, 21);

    this._clock.default = 1;

    this.addMask('', 1);
  }

  public run(time: number): boolean {
    if (this._clock.value) {
      let bits = 0;

      this._masks.forEach(mask => {
        let value = -1 >>> (32 - mask.size);
        value &= this._instruction.value >>> bits;
        mask.output.value = value;
        bits += mask.size;
      });
    }

    return super.run(time);
  }

  public serialize(): MicroInstructionRegisterInfo {
    const cpnt = <MicroInstructionRegisterInfo> super.serialize();
    cpnt.masks = this._masks.map(mask => {
      return {
        name: mask.output.name,
        size: mask.size,
      };
    });
    return cpnt;
  }

  public deserialize(obj: MicroInstructionRegisterInfo): void {
    if (obj.masks) {
      this._masks.length = 0;
      obj.masks.forEach(({ name, size }) =>
        this.addMask(name, size));
    }
  }

  public addMask(name: string, size: number): number {
    const id = `mask${this.count + 1}`;
    const output = this.addOutput(id, name, 0, 42);
    this._masks.push({ output, size });
    this.makeMasks();
    return this._masks.length - 1;
  }

  public getMask(index: number): Mask | undefined {
    const mask = this._masks[index];
    if (!mask) {
      return undefined;
    } else {
      const name = mask.output.name;
      const size = mask.size;
      return { name, size };
    }
  }

  public setMask(index: number, name: string, size: number): void {
    if (index >= 0 && index < this._masks.length) {
      const mask = this._masks[index];
      mask.output.name = name;
      mask.size = size;
      this.makeMasks();
    }
  }

  public removeMask(): number {
    const mask = this._masks.pop();
    if (mask) {
      this.removeOutput(mask.output.ioId);
      this.makeMasks();
    }
    return this._masks.length;
  }

  public makeMasks(): void {
    const space = 329 / (this._masks.length + 1);

    let x = 0;
    this._masks.forEach(mask => {
      x += space;
      mask.output.x = x;
    });
  }
}

class MicroInstructionRegisterItem extends CpntItem {
  public get type(): string {
    return 'Micro Instruction Register';
  }

  public get image(): string {
    return 'images/cpnt/MicroInstructionRegister.svg';
  }

  public get width(): number {
    return 330;
  }

  public get height(): number {
    return 43;
  }

  public cpnt(top: number, left: number): Component {
    return new MicroInstructionRegister(this, top, left);
  }
}

customElements.define('cpnt-mir', MicroInstructionRegister);
customElements.define('cpnt-item-mir', MicroInstructionRegisterItem);

export { MicroInstructionRegisterItem, MicroInstructionRegister };
