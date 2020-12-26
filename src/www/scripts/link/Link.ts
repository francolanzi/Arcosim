import Center from '../ifaces/Center.js';
import LinkInfo from '../ifaces/LinkInfo.js';
import Input from '../io/Input.js';
import Output from '../io/Output.js';
import LinkCorner from './LinkCorner.js';

class Link {
  private _value: number;
  private _width: number;

  private readonly _corners: Array<LinkCorner>;
  private readonly _line: SVGPolylineElement;
  private readonly _areas: Array<SVGLineElement>;

  public readonly input: Input;
  public readonly output: Output;
  public readonly svg: SVGGElement;

  public get value(): number {
    return this._value;
  }

  public set value(value: number) {
    this._value = value;
    this.input.value = value;
  }

  public get width(): number {
    return this._width;
  }

  public set width(value: number) {
    value = Math.min(Math.max(value, 1), 10);
    this._width = value;
    this._line.style.strokeWidth = `${value}px`;
  }

  public get color(): string {
    return this._line.style.stroke;
  }

  public set color(value: string) {
    this._line.style.stroke = value;
  }

  public get dashed(): boolean {
    return this._line.style.strokeDasharray !== 'none';
  }

  public set dashed(value: boolean) {
    this._line.style.strokeDasharray = value ? '10,10' : 'none';
  }

  private static offset(c1: Center, c2: Center) {
    const dx = c2.x - c1.x;
    const dy = c2.y - c1.y;

    if (dx === 0) {
      return {
        x: c1.x,
        y: c1.y + Math.sign(dy) * 5,
      };
    } else {
      const m = dy / dx;

      const x = c1.x + Math.sign(dx) * 5 / Math.sqrt(1 + m * m);
      const y = c1.y + m * (x - c1.x);

      return { x, y };
    }
  }

  public constructor(input: Input, output: Output) {
    this.input = input;
    this.output = output;

    this._value = 0;
    this._width = 1;

    this.value = this._value;

    this._corners = [];

    const uri = 'http://www.w3.org/2000/svg';

    this.svg = document.createElementNS(uri, 'g');
    this._line = document.createElementNS(uri, 'polyline');
    this._areas = [document.createElementNS(uri, 'line')];

    this.svg.classList.add('cpnt-link');

    this.svg.append(this._line);
    this.svg.append(this._areas[0]);

    this._areas[0].addEventListener('dblclick', ev => {
      const area = <SVGLineElement>ev.target;
      const index = this._areas.indexOf(area);
      this.addCorner(index, ev.pageX, ev.pageY);
    });

    this._line.setAttribute('points', '0,0 0,0');

    this.width = this._width;
    this.color = 'black';
    this.dashed = false;

    output.addLink(this);

    this.moveInput();
    this.moveOutput();
  }

  public moveInput(): void {
    const c1 = this.input.center;
    const c2 = this._corners.length ? this._corners[0].center : this.output.center;

    const { x, y } = Link.offset(c1, c2);

    const points = this._line.getAttribute('points')?.split(' ');

    if (points) {
      points[0] = `${c1.x},${c1.y}`;
      this._line.setAttribute('points', points.reduce((acum, curr) => `${acum} ${curr}`));
    }

    this._areas[0].setAttribute('x1', x.toString());
    this._areas[0].setAttribute('y1', y.toString());
  }

  public moveOutput(): void {
    const c1 = this.output.center;
    const c2 = this._corners.length ? this._corners[this._corners.length - 1].center : this.input.center;

    const { x, y } = Link.offset(c1, c2);

    const i = this._corners.length;

    const points = this._line.getAttribute('points')?.split(' ');

    if (points) {
      points[i + 1] = `${c1.x},${c1.y}`;
      this._line.setAttribute('points', points.reduce((acum, curr) => `${acum} ${curr}`));
    }

    this._areas[i].setAttribute('x2', x.toString());
    this._areas[i].setAttribute('y2', y.toString());
  }

  public moveCorner(corner: LinkCorner): void {
    const center = corner.center;
    const i = this._corners.indexOf(corner);

    const points = this._line.getAttribute('points')?.split(' ');

    if (points) {
      points[i + 1] = `${center.x},${center.y}`;
      this._line.setAttribute('points', points.reduce((acum, curr) => `${acum} ${curr}`));
    }

    this._areas[i].setAttribute('x2', center.x.toString());
    this._areas[i].setAttribute('y2', center.y.toString());

    this._areas[i + 1].setAttribute('x1', center.x.toString());
    this._areas[i + 1].setAttribute('y1', center.y.toString());

    this.moveInput();
    this.moveOutput();
  }

  public remove(): void {
    this.svg.remove();
    this._line.remove();
    this.input.removeLink();
    this.output.removeLink(this);
    this._areas.forEach(area => area.remove());
    this._corners.forEach(corner => corner.remove());
  }

  public addCorner(index: number, x: number, y: number): void {
    const area = this._areas[index];
    const corner = new LinkCorner(x, y);
    const newArea = document.createElementNS('http://www.w3.org/2000/svg', 'line');

    newArea.addEventListener('dblclick', ev => {
      const area = <SVGLineElement>ev.target;
      const index = this._areas.indexOf(area);
      this.addCorner(index, ev.pageX, ev.pageY);
    });

    corner.addEventListener('move', () => this.moveCorner(corner));
    corner.addEventListener('remove', () => this.removeCorner(corner));

    document.body.append(corner);
    this.svg.append(newArea);

    this._corners.splice(index, 0, corner);
    this._areas.splice(index, 0, newArea);

    const x1 = area.getAttribute('x1');
    const y1 = area.getAttribute('y1');

    if (x1 && y1) {
      newArea.setAttribute('x1', x1);
      newArea.setAttribute('y1', y1);
    }

    const points = this._line.getAttribute('points')?.split(' ');

    if (points) {
      points.splice(index + 1, 0, '0,0');
      this._line.setAttribute('points', points.reduce((acum, curr) => `${acum} ${curr}`));
    }

    this.moveCorner(corner);
  }

  public removeCorner(corner: LinkCorner): void {
    const i = this._corners.indexOf(corner);

    const area = this._areas[i];

    corner.remove();
    area.remove();

    this._corners.splice(i, 1);
    this._areas.splice(i, 1);

    const points = this._line.getAttribute('points')?.split(' ');

    if (points) {
      points.splice(i + 1, 1);
      this._line.setAttribute('points', points.reduce((acum, curr) => `${acum} ${curr}`));
    }

    if (i > 0) {
      this.moveCorner(this._corners[i - 1]);
    } else {
      this.moveInput();
    }
  }

  public serialize(): LinkInfo {
    return {
      input: this.input.serialize(),
      output: this.output.serialize(),
      corners: this._corners.map(corner => corner.serialize()),
    };
  }

  public deserialize(obj: LinkInfo): void {
    obj.corners.forEach((info, index) =>
      this.addCorner(index, info.x, info.y));
  }
}

export default Link;
