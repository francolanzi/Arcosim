import CpntData from './CpntData';

interface CpntInfo {
  type: string,
  cpntId: number,
  top: number,
  left: number,
  label: string,
  data: CpntData,
}

export default CpntInfo;
