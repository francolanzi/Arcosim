import Draggable from '../Draggable.js';

class Modal extends Draggable {
  private readonly _title: HTMLDivElement;
  private readonly _content: HTMLDivElement;
  private readonly _close: HTMLImageElement;

  public constructor () {
    super(0, 0);

    this._title = document.createElement('div');
    this._title.classList.add('modal-title');
    this.append(this._title);

    this._content = document.createElement('div');
    this._content.classList.add('modal-content');
    this.append(this._content);

    this._close = document.createElement('img');
    this._close.classList.add('modal-close');
    this._close.src = 'images/modal/times.svg';
    this.append(this._close);

    this.handle = this._title;

    this._close.addEventListener('click', () =>
      this.dispatchEvent(new Event('close')));

    this.addEventListener('click', ev => ev.stopPropagation());

    this.center();
  }

  public show (title: string, content: Node): void {
    this._title.textContent = title;
    new ResizeObserver(() => this.center()).observe(this._content);
    this._content.append(content);
  }

  public hide (): void {
    this._title.textContent = '';
    const content = this._content.lastChild;
    if (content) {
      this._content.removeChild(content);
    }
    this.center();
  }
}

customElements.define('modal-box', Modal);

export default Modal;
