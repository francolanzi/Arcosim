class CustomSelect extends HTMLElement {
  get value() {
    return this._value;
  }

  set value(value) {
    let option = this._options.get(this._value);
    option.toggleAttribute('selected', false);

    this._value = value;
    option = this._options.get(value);
    option.toggleAttribute('selected', true);
    this._text.textContent = option.textContent;
  }

  constructor(value, options) {
    super();

    this.tabIndex = 0;

    this._text = document.createElement('span');
    this.appendChild(this._text);

    const dropdown = document.createElement('div');
    this.appendChild(dropdown);

    this._options = new Map();

    options.forEach((text, value) => {
      const option = document.createElement('span');
      option.textContent = text;
      dropdown.appendChild(option);
      this._options.set(value, option);
      option.addEventListener('click', () => {
        this.value = value;
        this.blur();
      });
    });

    this._value = value;
    this.value = value;
  }
}

customElements.define('custom-select', CustomSelect);

module.exports = CustomSelect;
