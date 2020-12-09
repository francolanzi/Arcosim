import Component from './Component.js';
import Computer from './Computer.js';

abstract class CpntItem extends HTMLElement {
  public readonly computer: Computer;

  public abstract get type(): string;
  public abstract get image(): string;
  public abstract get width(): number;
  public abstract get height(): number;

  public constructor(computer: Computer) {
    super();

    this.setAttribute('is', 'cpnt-item');
    this.computer = computer;
    this.init();
  }

  private init(): void {
    const img = new Image(this.width, this.height);
    img.src = this.image;
    this.append(img);

    img.addEventListener('mousedown', ev => {
      const rect = img.getBoundingClientRect();
      const top = ev.pageY - ev.clientY + rect.top;
      const left = ev.pageX - ev.clientX + rect.left;
      const cpnt = this.cpnt(top, left);

      this.computer.addCpnt(cpnt);
      cpnt.drag(ev);
    });
  }

  public abstract cpnt(top: number, left: number): Component;
}

export default CpntItem;
