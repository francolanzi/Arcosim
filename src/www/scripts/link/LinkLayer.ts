import Input from '../io/Input.js';
import Output from '../io/Output.js';
import Link from './Link.js';

class LinkLayer extends HTMLElement {
  private readonly _svg: SVGSVGElement;
  private readonly _inputLinks: Map<Input, Link>;
  private readonly _outputLinks: Map<Output, Set<Link>>;

  public constructor () {
    super();

    this._inputLinks = new Map();
    this._outputLinks = new Map();

    const uri = 'http://www.w3.org/2000/svg';

    this._svg = document.createElementNS(uri, 'svg');
    this.append(this._svg);

    new ResizeObserver(() => this.resize()).observe(this);

    window.addEventListener('resize', () => this.resize());
    window.addEventListener('scroll', () => this.resize());
  }

  public resize (): void {
    const rect = this.getBoundingClientRect();

    const x = window.scrollX;
    const y = window.scrollY;
    const width = rect.width;
    const height = rect.height;

    this._svg.setAttribute('width', width.toString());
    this._svg.setAttribute('height', height.toString());
    this._svg.setAttribute('viewBox', `${x} ${y} ${width} ${height}`);
  }

  public addLink (link: Link): void {
    if (!this._inputLinks.has(link.input)) {
      this._svg.append(link.svg);

      this._inputLinks.set(link.input, link);

      if (!this._outputLinks.has(link.output)) {
        this._outputLinks.set(link.output, new Set());
      }

      const links = this._outputLinks.get(link.output);

      if (links) {
        links.add(link);
      }
    }
  }

  public moveInput (input: Input): void {
    const link = this._inputLinks.get(input);

    if (link) {
      link.moveInput();
    }
  }

  public moveOutput (output: Output): void {
    const links = this._outputLinks.get(output);

    if (links) {
      links.forEach(link =>
        link.moveOutput());
    }
  }

  public removeInput (input: Input): void {
    if (this._inputLinks.has(input)) {
      const link = this._inputLinks.get(input);

      if (link) {
        this._inputLinks.delete(input);

        const links = this._outputLinks.get(link.output);

        if (links) {
          links.delete(link);
          if (links.size === 0) {
            this._outputLinks.delete(link.output);
          }
        }
      }
    }
  }

  public removeOutput (output: Output): void {
    const links = this._outputLinks.get(output);

    if (links) {
      links.forEach(link =>
        this._inputLinks.delete(link.input));
      this._outputLinks.delete(output);
    }
  }
}

customElements.define('link-layer', LinkLayer);

export default LinkLayer;
