const Component = require('../Component');

class Clock extends Component {
  static get imageFile() {
    return 'img/cpnt/Clock.png';
  }

  constructor(top, left) {
    super(top, left);

    this.addOutput('Subcycle1', 0, 49.4);
    this.addOutput('Subcycle2', 0, 35.8);
    this.addOutput('Subcycle3', 0, 22.2);
    this.addOutput('Subcycle4', 0, 8.6);
  }
}

customElements.define('cpnt-clock', Clock);

module.exports = Clock;
