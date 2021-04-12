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
      const label = this.cpnt.getLabel(index);
      const value = this.cpnt.getRegister(index);
      const register = new Register(index, label, value);
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
    let label = cpnt.getLabel(index);

    while (value !== undefined) {
      const register = new Register(index, label, value);
      this.append(register);
      value = cpnt.getRegister(++index);
      label = cpnt.getLabel(index);
      register.addEventListener('change', () => {
        cpnt.setLabel(register.index, register.label);
        cpnt.setRegister(register.index, register.value);
        register.value = cpnt.getRegister(register.index);
      });
    }
  }
}

customElements.define('cpnt-registers-list', RegistersList);

export default RegistersList;
