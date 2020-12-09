import CpntData from '../CpntData';
import Mask from '../Mask.js';

interface SplitterData extends CpntData {
  masks: Array<Mask>,
}

export default SplitterData;
