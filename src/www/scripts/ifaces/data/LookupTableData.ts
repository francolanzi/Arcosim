import CpntData from '../CpntData';

interface LookupTableData extends CpntData {
  table: Array<[string, string]>,
  default: number
}

export default LookupTableData;
