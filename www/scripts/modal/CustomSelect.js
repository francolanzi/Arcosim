class CustomSelect extends HTMLSelectElement {
  constructor(value, options) {
    super();

    this.setAttribute('is', 'custom-select');

    options.forEach((text, value) => {
      const option = document.createElement('option');
      option.textContent = text;
      option.value = value;
      this.append(option);
    });

    this.value = value;
  }
}

customElements.define('custom-select', CustomSelect, { extends: 'select' });

export default CustomSelect;
