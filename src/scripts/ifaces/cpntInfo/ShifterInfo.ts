import CpntInfo from '../CpntInfo.js';

interface ShifterInfo extends CpntInfo {
  functions: Array<{ func: number, value: number }>,
}

export default ShifterInfo;
