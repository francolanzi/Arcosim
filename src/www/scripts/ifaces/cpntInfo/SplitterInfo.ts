import CpntInfo from '../CpntInfo.js';

interface SplitterInfo extends CpntInfo {
  masks: Array<{ name: string, size: number }>,
}

export default SplitterInfo;
