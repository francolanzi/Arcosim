import Component from './Component';
import Computer from './Computer';

const { readFileSync, writeFileSync } = window.require('fs');
const { ipcRenderer } = window.require('electron');
const { basename } = window.require('path');

class FileManager {
  private constructor () {
    throw new Error('Serialization can not be instantiated');
  }

  public static new (computer: Computer): void {
    computer.clear();
    ipcRenderer.invoke('set-title', 'Arcosim');
  }

  public static save (computer: Computer, path: string): void {
    try {
      const content = JSON.stringify(computer.serialize());
      writeFileSync(path, content);
      ipcRenderer.invoke('set-title', `Arcosim - ${basename(path)}`);
    } catch {
      console.log(`Write failed: ${path}`);
    }
  }

  public static open (computer: Computer, path: string): void {
    try {
      const content = readFileSync(path, { encoding: 'utf8' });
      computer.deserialize(JSON.parse(content));
      ipcRenderer.invoke('set-title', `Arcosim - ${basename(path)}`);
    } catch {
      console.log(`Read failed: ${path}`);
    }
  }

  public static export (cpnt: Component, path: string): void {
    try {
      const content = JSON.stringify(cpnt.export());
      writeFileSync(path, content);
    } catch {
      console.log(`Export failed: ${path}`);
    }
  }

  public static import (cpnt: Component, path: string): void {
    try {
      const content = readFileSync(path, { encoding: 'utf8' });
      cpnt.import(JSON.parse(content));
    } catch {
      console.log(`Import failed: ${path}`);
    }
  }
}

export default FileManager;
