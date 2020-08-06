class CustomSelect extends HTMLElement {
  get value() {
    return this._value;
  }

  set value(value) {
    if (this._value !== value) {
      if (this._value !== undefined) {
        const option = this._options.get(this._value);
        option.toggleAttribute('selected', false);
      }

      this._value = value;

      const option = this._options.get(value);
      option.toggleAttribute('selected', true);

      this._text.textContent = option.textContent;

      this.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  constructor(value, options) {
    super();

    this.tabIndex = 0;

    this._text = document.createElement('span');
    this.append(this._text);

    const dropdown = document.createElement('div');
    this.append(dropdown);

    this._options = new Map();

    options.forEach((text, value) => {
      const option = document.createElement('span');
      option.textContent = text;
      dropdown.append(option);
      this._options.set(value, option);
      option.addEventListener('click', () => {
        this.value = value;
        this.blur();
      });
    });

    this.value = value;
  }
}

customElements.define('custom-select', CustomSelect);

module.exports = CustomSelect;
