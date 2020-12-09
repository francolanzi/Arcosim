import Component from '../Component';

class CpntLabelEditor extends HTMLElement {
  constructor(cpnt: Component) {
    super();

    const input = document.createElement('input');
    input.id = 'label';
    input.value = cpnt.label;
    this.append(input);

    input.addEventListener('change', () => cpnt.label = input.value);
  }
}

customElements.define('cpnt-label-editor', CpntLabelEditor);

export default CpntLabelEditor;
