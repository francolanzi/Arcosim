import CpntData from '../CpntData';

interface LookupTableData extends CpntData {
  table: Array<[string, string]>,
}

export default LookupTableData;
