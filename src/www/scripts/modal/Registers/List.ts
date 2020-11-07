import { Registers } from '../../cpnts/Registers.js';
import Register from './Register.js';

class RegistersList extends HTMLElement {
  public readonly cpnt: Registers;

  public get count(): number {
    return this.cpnt.count;
  }

  public set count(count: number) {
    while (count > this.cpnt.count) {
      const index = this.cpnt.addRegister();
      const value = this.cpnt.getRegister(index);
      const register = new Register(index, value);
      this.append(register);
      register.addEventListener('change', () =>
        this.cpnt.setRegister(register.index, register.value));
    }

    while (count < this.cpnt.count) {
      this.cpnt.removeRegister();
      if (this.lastChild) {
        this.removeChild(this.lastChild);
      }
    }
  }

  public constructor(cpnt: Registers) {
    super();

    this.cpnt = cpnt;

    let index = 0;
    let value = cpnt.getRegister(index);

    while (value !== undefined) {
      const register = new Register(index, value);
      this.append(register);
      register.addEventListener('change', () =>
        cpnt.setRegister(register.index, register.value));
      value = cpnt.getRegister(++index);
    }
  }
}

customElements.define('cpnt-registers-list', RegistersList);

export default RegistersList;
