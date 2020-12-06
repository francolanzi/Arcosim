import CpntInfo from '../CpntInfo.js';

interface StoreInfo extends CpntInfo {
  bits: number,
  instructions: Array<number>,
}

export default StoreInfo;
