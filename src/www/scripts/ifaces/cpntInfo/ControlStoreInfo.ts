import CpntInfo from '../CpntInfo.js';

interface ControlStoreInfo extends CpntInfo {
  bits: number,
  instructions: Array<number>,
}

export default ControlStoreInfo;
