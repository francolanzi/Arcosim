import Component from '../Component.js';
import CpntItem from '../CpntItem.js';
import StoreData from '../ifaces/data/StoreData.js';
import Input from '../io/Input.js';
import Output from '../io/Output.js';
import Config from '../modal/Store/Config.js';

class Store extends Component {
  private _bits: number;

  private readonly _instructions: Array<number>;

  private readonly _position: Input;

  private readonly _instruction: Output;

  public get config(): Config {
    return new Config(this);
  }

  public get bits(): number {
    return this._bits;
  }

  public set bits(bits: number) {
    if (bits > 0 && bits <= 32) {
      const mask = 0xFFFFFFFF >>> (32 - bits);

      for (let i = 0; i < this._instructions.length; i++) {
        this._instructions[i] &= mask;
      }

      this._bits = bits;
    }
  }

  public get instructionCount(): number {
    return this._instructions.length;
  }

  public get instructions(): IterableIterator<number> {
    return this._instructions.values();
  }

  public constructor(item: CpntItem, top: number, left: number) {
    super(item, top, left);

    this._instructions = [0];
    this._bits = 32;

    this._position = this.addInput('position', 'Posición', 164, 0);

    this._instruction = this.addOutput('instruction', 'Instrucción', 164, 63);
  }

  public run(time: number): boolean {
    const index = this._position.value;

    if (index < this._instructions.length) {
      this._instruction.value = this._instructions[index];
    } else {
      this.stop();
    }

    return super.run(time);
  }

  public export(): StoreData {
    return {
      bits: this.bits,
      instructions: this._instructions,
    };
  }

  public import(data: StoreData): void {
    if (data.instructions) {
      this._instructions.length = 0;
      data.instructions.forEach((instruction, position) =>
        this.addInstruction(position, instruction));
    }

    if (data.bits) {
      this.bits = data.bits;
    }
  }

  public addInstruction(position: number, instruction: number): void {
    this._instructions.splice(position, 0, instruction);
  }

  public getInstruction(position: number): number {
    return this._instructions[position];
  }

  public setInstruction(position: number, instruction: number): void {
    this._instructions[position] = instruction;
  }

  public removeInstruction(position: number): void {
    this._instructions.splice(position, 1);
  }
}

class StoreItem extends CpntItem {
  public get type(): string {
    return 'Store';
  }

  public get image(): string {
    return 'images/cpnt/Store.svg';
  }

  public get width(): number {
    return 329;
  }

  public get height(): number {
    return 64;
  }

  public cpnt(top: number, left: number): Component {
    return new Store(this, top, left);
  }
}

customElements.define('cpnt-store', Store);
customElements.define('cpnt-item-store', StoreItem);

export { StoreItem, Store };
