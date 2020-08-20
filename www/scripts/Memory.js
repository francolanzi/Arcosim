class Memory {
  get data() {
    return this._data;
  }

  set data(data) {
    this._data = data;
    this.update();
  }

  get address() {
    return this._address;
  }

  set address(address) {
    this._address = address;
    this.update();
  }

  get read() {
    return this._read;
  }

  set read(read) {
    this._read = read;
    this.update();
  }

  get write() {
    return this._write;
  }

  set write(write) {
    this._write = write;
    this.update();
  }

  constructor() {
    this._cells = new Map();

    this._data = 0;
    this._address = 0;
    this._read = 0;
    this._write = 0;
  }

  update() {
    if (this._read) {
      this._data = this.getCell(this._address);
    }
    if (this._write) {
      this.setCell(this._address, this._data);
    }
  }

  getCell(address) {
    const data = this._cells.get(address);
    return data ? data : 0;
  }

  setCell(address, data) {
    if (data) {
      this._cells.set(address, data);
    } else {
      this._cells.delete(address);
    }
  }
}

export default Memory;
