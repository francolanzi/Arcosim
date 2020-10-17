import CpntInfo from '../CpntInfo.js';

interface MicroInstructionRegisterInfo extends CpntInfo {
  masks: Array<{ name: string, size: number }>,
}

export default MicroInstructionRegisterInfo;
