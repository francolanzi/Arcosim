import Component from '../Component';

class CpntLabelEditor extends HTMLElement {
  public constructor (cpnt: Component) {
    super();

    const input = document.createElement('input');
    input.id = 'label';
    input.value = cpnt.label;
    input.placeholder = 'Etiqueta';
    this.append(input);

    input.addEventListener('change', () => {
      cpnt.label = input.value;
    });
  }
}

customElements.define('cpnt-label-editor', CpntLabelEditor);

export default CpntLabelEditor;
