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

    this._areas[0].addEventListener('dblclick', ev => this.addCorner(ev));

    this._line.setAttribute('points', '0,0 0,0');

    this.width = this._width;
    this.color = 'black';
    this.dashed = false;

    output.addLink(this);

    this.moveInput();
    this.moveOutput();
  }

  public moveInput(): void {
    const center = this.input.center;

    const points = this._line.getAttribute('points')?.split(' ');

    if (points) {
      points[0] = `${center.x},${center.y}`;
      this._line.setAttribute('points', points.reduce((acum, curr) => `${acum} ${curr}`));
    }

    this._areas[0].setAttribute('x1', center.x.toString());
    this._areas[0].setAttribute('y1', center.y.toString());
  }

  public moveOutput(): void {
    const i = this._corners.length;
    const center = this.output.center;

    const points = this._line.getAttribute('points')?.split(' ');

    if (points) {
      points[i + 1] = `${center.x},${center.y}`;
      this._line.setAttribute('points', points.reduce((acum, curr) => `${acum} ${curr}`));
    }

    this._areas[i].setAttribute('x2', center.x.toString());
    this._areas[i].setAttribute('y2', center.y.toString());
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
  }

  public remove(): void {
    this.svg.remove();
    this._line.remove();
    this.output.removeLink(this);
    this._areas.forEach(area => area.remove());
    this._corners.forEach(corner => corner.remove());
  }

  public addCorner(ev: MouseEvent): void {
    const line = <SVGLineElement>ev.target;
    const i = this._areas.indexOf(line);

    const corner = new LinkCorner(ev.pageX, ev.pageY);
    const area = document.createElementNS('http://www.w3.org/2000/svg', 'line');

    area.addEventListener('dblclick', ev => this.addCorner(ev));
    corner.addEventListener('move', () => this.moveCorner(corner));
    corner.addEventListener('remove', () => this.removeCorner(corner));

    document.body.append(corner);
    this.svg.append(area);

    this._corners.splice(i, 0, corner);
    this._areas.splice(i, 0, area);

    const x1 = line.getAttribute('x1');
    const y1 = line.getAttribute('y1');

    if (x1 && y1) {
      area.setAttribute('x1', x1);
      area.setAttribute('y1', y1);
    }

    const points = this._line.getAttribute('points')?.split(' ');

    if (points) {
      points.splice(i + 1, 0, '0,0');
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
}

export default Link;
