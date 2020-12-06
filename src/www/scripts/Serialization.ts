import Computer from './Computer';

const { readFileSync, writeFileSync } = window.require('fs');

class Serialization {
  private constructor() {
    throw new Error('Serialization can not be instantiated');
  }

  public static serialize(computer: Computer, path: string): void {
    try {
      const content = JSON.stringify(computer.serialize());
      writeFileSync(path, content);
    } catch {
      console.log(`Write failed: ${path}`);
    }
  }

  public static deserialize(computer: Computer, path: string): void {
    try {
      const content = readFileSync(path, { encoding: 'utf8' });
      computer.deserialize(JSON.parse(content));
    } catch {
      console.log(`Read failed: ${path}`);
    }
  }
}

export default Serialization;
