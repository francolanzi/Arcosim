const Component = require('../Component');

class MPC extends Component {
  static get imageFile() {
    return 'img/cpnt/MPC.png';
  }

  constructor(top, left) {
    super(top, left);

    this.addInput('Next', 26.5, 0);
    this.addInput('Clock', 53, 11);

    this.addOutput('Current', 26.5, 22);
  }
}

customElements.define('cpnt-mpc', MPC);

module.exports = MPC;
