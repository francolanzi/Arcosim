import CpntData from '../CpntData';

interface RegistersData extends CpntData {
  registers: Array<string>,
  labels: Array<string>,
}

export default RegistersData;
