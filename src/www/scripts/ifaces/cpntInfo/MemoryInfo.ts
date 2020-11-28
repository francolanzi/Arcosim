import CpntInfo from '../CpntInfo.js';

interface MemoryInfo extends CpntInfo {
  cells: Array<[number, string]>,
}

export default MemoryInfo;
