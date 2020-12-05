import Count from './Count.js';
import List from './List.js';
import Label from './Label.js';
import { Splitter } from '../../cpnts/Splitter';

class SplitterConfig extends HTMLElement {
  public constructor(cpnt: Splitter) {
    super();

    const count = new Count();
    const msb = new Label('Most Significant Bit');
    const lsb = new Label('Less Significant Bit');
    const list = new List(cpnt);

    this.append(count);
    this.append(msb);
    this.append(list);
    this.append(lsb);

    count.addEventListener('add', () => list.addMask());
    count.addEventListener('remove', () => list.removeMask());
  }
}

customElements.define('cpnt-splitter-config', SplitterConfig);

export default SplitterConfig;
