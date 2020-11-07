import Component from '../Component.js';
import CpntItem from '../CpntItem.js';
import MicroSequenceLogicInfo from '../ifaces/cpntInfo/MicroSequenceLogicInfo.js';
import Input from '../io/Input.js';
import Output from '../io/Output.js';
import Config from '../modal/MicroSequenceLogic/Config.js';

class MicroSequenceLogic extends Component {
  private readonly _conditions: Array<number>;

  private readonly _condition: Input;
  private readonly _controlN: Input;
  private readonly _controlZ: Input;

  private readonly _jump: Output;

  public static get supported(): Array<string> {
    return [
      'Nunca',   // 0
      '> 0',     // 1
      '< 0',     // 2
      '= 0',     // 3
      '!= 0',    // 4
      '>= 0',    // 5
      '<= 0',    // 6
      'Siempre', // 7
    ];
  }

  public get config(): Config {
    return new Config(this);
  }

  public get count(): number {
    return this._conditions.length;
  }

  public constructor(item: CpntItem, top: number, left: number) {
    super(item, top, left);

    this._conditions = [];

    this._condition = this.addInput('condition', 'Condición', 61, 20.5);
    this._controlN = this.addInput('controlN', 'N', 0, 15);
    this._controlZ = this.addInput('controlZ', 'Z', 0, 26);

    this._jump = this.addOutput('jump', 'Saltar', 30.5, 0);

    this.addCondition(0);
    this.addCondition(2);
    this.addCondition(3);
    this.addCondition(7);
  }

  public run(time: number): boolean {
    switch (this._conditions[this._condition.value]) {
    case 0:
      this._jump.value = 0;
      break;
    case 1:
      this._jump.value = 1 - this._controlN.value - this._controlZ.value;
      break;
    case 2:
      this._jump.value = this._controlN.value;
      break;
    case 3:
      this._jump.value = this._controlZ.value;
      break;
    case 4:
      this._jump.value = 1 - this._controlZ.value;
      break;
    case 5:
      this._jump.value = 1 - this._controlN.value;
      break;
    case 6:
      this._jump.value = this._controlN.value + this._controlZ.value;
      break;
    case 7:
      this._jump.value = 1;
      break;
    default:
      break;
    }
    return super.run(time);
  }

  public serialize(): MicroSequenceLogicInfo {
    const cpnt = <MicroSequenceLogicInfo> super.serialize();
    cpnt.conditions = [...this._conditions];
    return cpnt;
  }

  public deserialize(obj: MicroSequenceLogicInfo): void {
    if (obj.conditions) {
      this._conditions.length = 0;
      obj.conditions.forEach(cond => this.addCondition(cond));
    }
  }

  public addCondition(cond: number): number {
    this._conditions.push(cond);
    return this._conditions.length - 1;
  }

  public getCondition(index: number): number {
    return this._conditions[index];
  }

  public setCondition(index: number, cond: number): void {
    if (index >= 0 && index < this._conditions.length) {
      this._conditions[index] = cond;
    }
  }

  public removeCondition(): number {
    if (this._conditions.length > 1) {
      this._conditions.pop();
    }
    return this._conditions.length;
  }
}

class MicroSequenceLogicItem extends CpntItem {
  public get type(): string {
    return 'Micro Sequence Logic';
  }

  public get image(): string {
    return 'images/cpnt/MicroSequenceLogic.svg';
  }

  public get width(): number {
    return 62;
  }

  public get height(): number {
    return 42;
  }

  public cpnt(top: number, left: number): Component {
    return new MicroSequenceLogic(this, top, left);
  }
}

customElements.define('cpnt-msl', MicroSequenceLogic);
customElements.define('cpnt-item-msl', MicroSequenceLogicItem);

export { MicroSequenceLogicItem, MicroSequenceLogic };
