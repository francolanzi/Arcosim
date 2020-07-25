const Component = require('../Component');

class ControlStore extends Component {
  static get imageFile() {
    return 'img/cpnt/ControlStore.png';
  }

  constructor(top, left) {
    super(top, left);

    this.addInput('Number', 164, 0);

    this.addOutput('Instruction', 164, 63);
  }
}

customElements.define('cpnt-control-store', ControlStore);

module.exports = ControlStore;
