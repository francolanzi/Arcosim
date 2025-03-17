import Modal from './Modal.js';

class ModalLayer extends HTMLElement {
  private readonly _modal: Modal;

  public constructor () {
    super();

    this._modal = new Modal();
    this._modal.area = this;
    this.append(this._modal);

    this._modal.addEventListener('close', () =>
      this.classList.remove('show'));

    this.addEventListener('click', () =>
      this.classList.remove('show'));

    this.addEventListener('transitionend', () => {
      if (!this.classList.contains('show')) {
        this._modal.hide();
      }
    });
  }

  public show (title: string, content: Node): void {
    this._modal.show(title, content);
    this.classList.add('show');
  }
}

customElements.define('modal-layer', ModalLayer);

export default ModalLayer;
