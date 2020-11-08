class CustomSelect extends HTMLSelectElement {
  public constructor(value: number, options: Map<number, string>) {
    super();

    this.setAttribute('is', 'custom-select');

    options.forEach((text, value) => {
      const option = document.createElement('option');
      option.textContent = text;
      option.value = value.toString();
      this.append(option);
    });

    this.value = value.toString();
  }
}

customElements.define('custom-select', CustomSelect, { extends: 'select' });

export default CustomSelect;
