import CpntData from '../CpntData';

interface ShifterData extends CpntData {
  functions: Array<{ func: number, value: number }>,
}

export default ShifterData;
