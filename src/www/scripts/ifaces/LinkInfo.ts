import CornerInfo from './CornerInfo';
import IOInfo from './IOInfo';

interface LinkInfo {
  input: IOInfo,
  output: IOInfo,
  corners: Array<CornerInfo>,
}

export default LinkInfo;
