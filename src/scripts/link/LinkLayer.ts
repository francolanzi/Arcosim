import Input from '../io/Input.js';
import Output from '../io/Output.js';
import Link from './Link.js';

class LinkLayer extends HTMLElement {
  private readonly _inputLinks: Map<Input, Link>;
  private readonly _outputLinks: Map<Output, Set<Link>>;

  public readonly svg: SVGSVGElement;

  public constructor() {
    super();

    this._inputLinks = new Map();
    this._outputLinks = new Map();

    const uri = 'http://www.w3.org/2000/svg';

    this.svg = document.createElementNS(uri, 'svg');
    this.append(this.svg);

    new ResizeObserver(() => this.resize()).observe(this);

    window.addEventListener('resize', () => this.resize());
    window.addEventListener('scroll', () => this.resize());
  }

  public resize(): void {
    const rect = this.getBoundingClientRect();

    const x = window.scrollX;
    const y = window.scrollY;
    const width = rect.width;
    const height = rect.height;

    this.svg.setAttribute('width', width.toString());
    this.svg.setAttribute('height', height.toString());
    this.svg.setAttribute('viewBox', `${x} ${y} ${width} ${height}`);
  }

  public addLink(input: Input, output: Output): void {
    if (!this._inputLinks.has(input)) {
      const link = new Link(this, input, output);

      this._inputLinks.set(input, link);

      if (!this._outputLinks.has(output)) {
        this._outputLinks.set(output, new Set());
      }

      const links = this._outputLinks.get(output);

      if (links) {
        links.add(link);
      }
    }
  }

  public moveInput(input: Input): void {
    const link = this._inputLinks.get(input);

    if (link) {
      link.moveInput();
    }
  }

  public moveOutput(output: Output): void {
    const links = this._outputLinks.get(output);

    if (links) {
      links.forEach(link =>
        link.moveOutput());
    }
  }

  public removeInput(input: Input): void {
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

        link.remove();
      }
    }
  }

  public removeOutput(output: Output): void {
    const links = this._outputLinks.get(output);

    if (links) {
      links.forEach(link => {
        this._inputLinks.delete(link.input);
        link.remove();
      });
      this._outputLinks.delete(output);
    }
  }
}

customElements.define('link-layer', LinkLayer);

export default LinkLayer;
