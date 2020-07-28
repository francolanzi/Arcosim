class ModalLayer extends HTMLElement {
  constructor() {
    super();

    this._modal = document.createElement('div');
    this._modal.classList.add('modal');
    this.appendChild(this._modal);

    this.addEventListener('click', ev => {
      if (ev.target === this) {
        this.classList.remove('show');
      }
    });
  }

  show(content) {
    this._modal.innerHTML = content;
    this.classList.add('show');
  }
}

customElements.define('modal-layer', ModalLayer);

module.exports = ModalLayer;
