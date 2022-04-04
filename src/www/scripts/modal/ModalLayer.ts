class ModalLayer extends HTMLElement {
  private readonly _title: HTMLDivElement;
  private readonly _content: HTMLDivElement;
  private readonly _close: HTMLImageElement;

  public constructor () {
    super();

    const modal = document.createElement('div');
    modal.classList.add('modal');
    this.append(modal);

    this._title = document.createElement('div');
    this._title.classList.add('modal-title');
    modal.append(this._title);

    this._content = document.createElement('div');
    this._content.classList.add('modal-content');
    modal.append(this._content);

    this._close = document.createElement('img');
    this._close.classList.add('modal-close');
    this._close.src = 'images/modal/times.svg';
    modal.append(this._close);

    this._close.addEventListener('click', () =>
      this.classList.remove('show'));

    this.addEventListener('transitionend', () => {
      if (!this.classList.contains('show')) {
        this._title.textContent = '';
        const content = this._content.lastChild;
        if (content) {
          this._content.removeChild(content);
        }
      }
    });
  }

  public show (title: string, content: Node): void {
    this._title.textContent = title;
    this._content.append(content);
    this.classList.add('show');
  }
}

customElements.define('modal-layer', ModalLayer);

export default ModalLayer;
