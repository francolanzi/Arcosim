import CpntData from '../CpntData';

interface MemoryData extends CpntData {
  delay: number,
  cells: Array<[number, string]>,
}

export default MemoryData;
