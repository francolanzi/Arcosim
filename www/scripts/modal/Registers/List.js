import Register from './Register.js';

class RegistersList extends HTMLElement {
  get cpnt() {
    return this._cpnt;
  }

  get count() {
    return this.cpnt.count;
  }

  set count(count) {
    while (count > this.cpnt.count) {
      const index = this.cpnt.addRegister();
      const value = this.cpnt.getRegister(index);
      const register = new Register(index, value);
      this.append(register);
      register.addEventListener('change', () =>
        this.cpnt.setRegister(register.index, register.value));
    }

    while (count < this._cpnt.count) {
      this._cpnt.removeRegister();
      this.removeChild(this.lastChild);
    }
  }

  constructor(cpnt) {
    super();

    this._cpnt = cpnt;

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
