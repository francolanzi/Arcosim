import CpntData from '../CpntData';

interface MemoryData extends CpntData {
  cells: Array<[number, string]>,
}

export default MemoryData;
