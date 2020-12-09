import CpntData from '../CpntData';

interface StoreData extends CpntData {
  bits: number,
  instructions: Array<number>,
}

export default StoreData;
