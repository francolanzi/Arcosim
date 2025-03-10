import CpntData from '../CpntData';
import Mask from '../Mask.js';

interface AssemblerData extends CpntData {
  masks: Array<Mask>,
}

export default AssemblerData;
