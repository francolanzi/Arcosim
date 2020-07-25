const Component = require('./Component');

class CpntOriginal extends Component {
  static get instance() {
    throw new Error('instance static property must be overrided');
  }

  constructor() {
    super();

    if (this.constructor == CpntOriginal) {
      throw new Error('CpntOriginal class can not be instantiated');
    }

    this.classList.add('cpnt-original');

    this.image.addEventListener('mousedown', ev => {
      const rect = this.getBoundingClientRect();

      const top = ev.pageY - ev.clientY + rect.top;
      const left = ev.pageX - ev.clientX + rect.left;

      const Instance = this.constructor.instance;
      const cpnt = new Instance(top, left);

      this.dispatchEvent(new CustomEvent('add', { detail: cpnt }));

      cpnt.drag(ev);
    });
  }
}

module.exports = CpntOriginal;
