import ArithmeticLogicUnit from './cpnts/ArithmeticLogicUnit.js';
import Clock from './cpnts/Clock.js';
import Const from './cpnts/Const.js';
import ControlStore from './cpnts/ControlStore.js';
import Decoder from './cpnts/Decoder.js';
import Display from './cpnts/Display.js';
import Encoder from './cpnts/Encoder.js';
import Increment from './cpnts/Increment.js';
import Latch from './cpnts/Latch.js';
import Memory from './cpnts/Memory.js';
import MemoryAddressRegister from './cpnts/MemoryAddressRegister.js';
import MemoryBufferRegister from './cpnts/MemoryBufferRegister.js';
import MicroInstructionRegister from './cpnts/MicroInstructionRegister.js';
import MicroSequenceLogic from './cpnts/MicroSequenceLogic.js';
import Multiplexer from './cpnts/Multiplexer.js';
import Registers from './cpnts/Registers.js';
import Shifter from './cpnts/Shifter.js';

class CpntItems {
  constructor(computer) {
    this._items = new Map();

    this.add(new ArithmeticLogicUnit(computer));
    this.add(new Clock(computer));
    this.add(new Const(computer));
    this.add(new ControlStore(computer));
    this.add(new Decoder(computer));
    this.add(new Display(computer));
    this.add(new Encoder(computer));
    this.add(new Increment(computer));
    this.add(new Latch(computer));
    this.add(new Memory(computer));
    this.add(new MemoryAddressRegister(computer));
    this.add(new MemoryBufferRegister(computer));
    this.add(new MicroInstructionRegister(computer));
    this.add(new MicroSequenceLogic(computer));
    this.add(new Multiplexer(computer));
    this.add(new Registers(computer));
    this.add(new Shifter(computer));
  }

  add(item) {
    this._items.set(item.type, item);
  }

  get(type) {
    return this._items.get(type);
  }

  list() {
    return this._items.values();
  }
}

export default CpntItems;
