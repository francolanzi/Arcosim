class StyledElement extends HTMLElement {
  constructor() {
    super();

    this._shadow = this.attachShadow({ mode: 'closed' });
    this._styles = new Map();
  }

  appendChild(newChild) {
    this._shadow.appendChild(newChild);
  }

  addStyles(href) {
    if (!this._styles.has(href)) {
      const styles = document.createElement('link');
      this._shadow.appendChild(styles);
      this._styles.set(href, styles);
      styles.rel = 'stylesheet';
      styles.href = href;
    }
  }

  removeStyles(href) {
    const styles = this._styles.get(href);
    if (styles) {
      styles.remove();
    }
    return this._styles.delete(href);
  }
}

module.exports = StyledElement;
