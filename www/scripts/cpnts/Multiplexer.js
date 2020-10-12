import Component from '../Component.js';
import CpntItem from '../CpntItem.js';

class Multiplexer extends Component {
  constructor(computer, top, left) {
    super(computer, top, left);

    this._inputA = this.addInput('A', 18.5, 0);
    this._inputB = this.addInput('B', 42.5, 0);
    this._control = this.addInput('Control', 61, 11);

    this._output = this.addOutput('Salida', 30.5, 22);
  }

  run() {
    this._output.value = this._control.value ?
      this._inputB.value : this._inputA.value;

    return super.run();
  }
}

class MultiplexerItem extends CpntItem {
  get type() {
    return 'Multiplexer';
  }

  get image() {
    return 'images/cpnt/Multiplexer.svg';
  }

  get width() {
    return 62;
  }

  get height() {
    return 23;
  }

  cpnt(top, left) {
    return new Multiplexer(this, top, left);
  }
}

customElements.define('cpnt-mux', Multiplexer);
customElements.define('cpnt-item-mux', MultiplexerItem);

export default MultiplexerItem;
