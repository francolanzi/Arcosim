import CpntInfo from '../CpntInfo.js';

interface MemoryInfo extends CpntInfo {
  cells: Array<[number, number]>,
}

export default MemoryInfo;
