import Computer from './Computer';

const { readFileSync, writeFileSync } = window.require('fs');
const { remote } = window.require('electron');
const { basename } = window.require('path');

class Serialization {
  private constructor() {
    throw new Error('Serialization can not be instantiated');
  }

  public static serialize(computer: Computer, path: string): void {
    try {
      const content = JSON.stringify(computer.serialize());
      writeFileSync(path, content);

      const window = remote.getCurrentWindow();
      window.setTitle(`Arcosim - ${basename(path)}`);
    } catch {
      console.log(`Write failed: ${path}`);
    }
  }

  public static deserialize(computer: Computer, path: string): void {
    try {
      const content = readFileSync(path, { encoding: 'utf8' });
      computer.deserialize(JSON.parse(content));

      const window = remote.getCurrentWindow();
      window.setTitle(`Arcosim - ${basename(path)}`);
    } catch {
      console.log(`Read failed: ${path}`);
    }
  }
}

export default Serialization;
