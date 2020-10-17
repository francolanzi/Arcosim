import Computer from './Computer.js';
import CpntItem from './CpntItem.js';
import { ArithmeticLogicUnitItem } from './cpnts/ArithmeticLogicUnit.js';
import { ClockItem } from './cpnts/Clock.js';
import { ConstItem } from './cpnts/Const.js';
import { ControlStoreItem } from './cpnts/ControlStore.js';
import { DecoderItem } from './cpnts/Decoder.js';
import { DisplayItem } from './cpnts/Display.js';
import { EncoderItem } from './cpnts/Encoder.js';
import { IncrementItem } from './cpnts/Increment.js';
import { LatchItem } from './cpnts/Latch.js';
import { MemoryItem } from './cpnts/Memory.js';
import { MemoryAddressRegisterItem } from './cpnts/MemoryAddressRegister.js';
import { MemoryBufferRegisterItem } from './cpnts/MemoryBufferRegister.js';
import { MicroInstructionRegisterItem } from './cpnts/MicroInstructionRegister.js';
import { MicroSequenceLogicItem } from './cpnts/MicroSequenceLogic.js';
import { MultiplexerItem } from './cpnts/Multiplexer.js';
import { RegistersItem } from './cpnts/Registers.js';
import { ShifterItem } from './cpnts/Shifter.js';

class CpntItems {
  private readonly _items: Map<string, CpntItem>;

  public constructor(computer: Computer) {
    this._items = new Map();

    this.add(new ArithmeticLogicUnitItem(computer));
    this.add(new ClockItem(computer));
    this.add(new ConstItem(computer));
    this.add(new ControlStoreItem(computer));
    this.add(new DecoderItem(computer));
    this.add(new DisplayItem(computer));
    this.add(new EncoderItem(computer));
    this.add(new IncrementItem(computer));
    this.add(new LatchItem(computer));
    this.add(new MemoryItem(computer));
    this.add(new MemoryAddressRegisterItem(computer));
    this.add(new MemoryBufferRegisterItem(computer));
    this.add(new MicroInstructionRegisterItem(computer));
    this.add(new MicroSequenceLogicItem(computer));
    this.add(new MultiplexerItem(computer));
    this.add(new RegistersItem(computer));
    this.add(new ShifterItem(computer));
  }

  public add(item: CpntItem): void {
    this._items.set(item.type, item);
  }

  public get(type: string): CpntItem | undefined {
    return this._items.get(type);
  }

  public list(): IterableIterator<CpntItem> {
    return this._items.values();
  }
}

export default CpntItems;
