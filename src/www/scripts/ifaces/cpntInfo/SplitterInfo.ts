import CpntInfo from '../CpntInfo.js';
import Mask from '../Mask.js';

interface SplitterInfo extends CpntInfo {
  masks: Array<Mask>,
}

export default SplitterInfo;
