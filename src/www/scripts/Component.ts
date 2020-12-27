import Computer from './Computer.js';
import CpntItem from './CpntItem.js';
import Draggable from './Draggable.js';
import CpntData from './ifaces/CpntData.js';
import CpntInfo from './ifaces/CpntInfo.js';
import Input from './io/Input.js';
import Output from './io/Output.js';
import TrashButton from './menu/buttons/TrashButton.js';
import CpntConfig from './modal/CpntConfig.js';

abstract class Component extends Draggable {
  private static _count = 0;

  private _time: number;
  private _label: HTMLDivElement;

  private readonly _item: CpntItem;
  private readonly _inputs: Map<string, Input>;
  private readonly _outputs: Map<string, Output>;

  public trash: TrashButton | undefined;

  public readonly cpntId: number

  public get config(): CpntConfig<Component> {
    return new CpntConfig(this);
  }

  public get type(): string {
    return this._item.type;
  }

  public get computer(): Computer {
    return this._item.computer;
  }

  public get label(): string {
    return this._label.textContent || '';
  }

  public set label(label: string) {
    this._label.textContent = label;
  }

  public get inputs(): IterableIterator<Input> {
    return this._inputs.values();
  }

  public get outputs(): IterableIterator<Output> {
    return this._outputs.values();
  }

  public constructor(item: CpntItem, top: number, left: number) {
    super(top, left);

    this._item = item;

    this.cpntId = ++Component._count;

    this.setAttribute('is', 'cpnt');

    this._time = -1;

    this._inputs = new Map();
    this._outputs = new Map();

    const img = new Image(item.width, item.height);

    img.src = item.image;
    this.append(img);

    img.addEventListener('dblclick', () => {
      const ev = new Event('config');
      this.dispatchEvent(ev);
    });

    this._label = document.createElement('div');
    this._label.setAttribute('is', 'cpnt-label');
    this._label.style.top = `${item.labelRect.top}px`;
    this._label.style.left = `${item.labelRect.left}px`;
    this._label.style.width = `${item.labelRect.width}px`;
    this._label.style.height = `${item.labelRect.height}px`;
    this.label = item.defaultLabel;
    this.append(this._label);
  }

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  public run(time: number): boolean {
    if (this._time !== time) {
      this._time = time;
      this._outputs.forEach(output =>
        output.color = 'black');
    }

    let changed = false;

    this._inputs.forEach(input => {
      if (input.changed) {
        changed = true;
      }
    });

    this._outputs.forEach(output => {
      if (output.changed) {
        changed = true;
        if (output.value) {
          output.color = 'red';
        }
      }
    });

    return changed;
  }

  public stop(): void {
    this.dispatchEvent(new Event('stop'));
  }

  public reset(): void {
    this._time = -1;
    this._outputs.forEach(output =>
      output.color = 'black');

    this._inputs.forEach(input => input.reset());
    this._outputs.forEach(output => output.reset());
  }

  public drag(ev: MouseEvent): void {
    super.drag(ev);

    this.classList.add('dragging');
  }

  public move(ev: MouseEvent): void {
    super.move(ev);

    const trashed = this.trashed(ev);

    this.classList.toggle('trashed', trashed);

    if (this.trash) {
      this.trash.active = trashed;
    }
  }

  public drop(ev: MouseEvent): void {
    super.drop(ev);

    this.classList.remove('dragging');

    if (this.trash) {
      this.trash.active = false;
    }

    if (this.trashed(ev)) {
      this.remove();
      this.dispatchEvent(new Event('remove'));
    }
  }

  public trashed(ev: MouseEvent): boolean {
    if (!this.trash) {
      return false;
    }

    const rect = this.trash.getBoundingClientRect();

    return ev.clientY >= rect.top
        && ev.clientX >= rect.left
        && ev.clientY <= rect.bottom
        && ev.clientX <= rect.right;
  }

  public addInput(id: string, name: string, x: number, y: number): Input {
    let input = this._inputs.get(id);

    if (input) {
      this._inputs.delete(id);
      input.remove();
    }

    input = new Input(this, id, name, x, y);

    this._inputs.set(input.ioId, input);
    this.append(input);

    input.addEventListener('unlink', () =>
      this.dispatchEvent(new CustomEvent('unlink', { detail: input })));

    return input;
  }

  public addOutput(id: string, name: string, x: number, y: number): Output {
    let output = this._outputs.get(id);

    if (output) {
      this._outputs.delete(id);
      output.remove();
    }

    output = new Output(this, id, name, x, y);

    this._outputs.set(output.ioId, output);
    this.append(output);

    return output;
  }

  public getInput(id: string): Input | undefined {
    return this._inputs.get(id);
  }

  public getOutput(id: string): Output | undefined {
    return this._outputs.get(id);
  }

  public removeInput(id: string): void {
    const input = this._inputs.get(id);
    if (input) {
      this._inputs.delete(id);
      input.remove();
      this.dispatchEvent(new CustomEvent('removeinput', { detail: input }));
    }
  }

  public removeOutput(id: string): void {
    const output = this._outputs.get(id);
    if (output) {
      this._outputs.delete(id);
      output.remove();
      this.dispatchEvent(new CustomEvent('removeoutput', { detail: output }));
    }
  }

  public serialize(): CpntInfo {
    return {
      type: this.type,
      cpntId: this.cpntId,
      top: this.top,
      left: this.left,
      label: this.label,
      data: this.export(),
    };
  }

  public deserialize(info: CpntInfo): void {
    if (this.type === info.type) {
      if (info.top) {
        this.top = info.top;
      }
      if (info.left) {
        this.left = info.left;
      }
      if (info.label) {
        this.label = info.label;
      }
      if (info.data) {
        this.import(info.data);
      }
    }
  }

  public export(): CpntData {
    return {};
  }

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  public import(data: CpntData): void {
    // nothing
  }

  public remove(): void {
    this._inputs.forEach(input => input.remove());
    this._outputs.forEach(output => output.remove());
    super.remove();
  }
}

export default Component;
