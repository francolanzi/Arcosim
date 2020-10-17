const { readFileSync } = window.require('fs');
const { resolve } = window.require('path');
const { remote, shell } = window.require('electron');

class About extends HTMLElement {
  public constructor() {
    super();

    const path = resolve(__dirname, '../package.json');
    const pckg = JSON.parse(readFileSync(path, 'utf8'));

    const iconImg = document.createElement('img');
    iconImg.src = 'images/icon.svg';

    const icon = document.createElement('a');
    icon.href = pckg.repository.url;
    icon.append(iconImg);

    const nameLink = document.createElement('a');
    nameLink.textContent = `ArCoSim ${pckg.version}`;
    nameLink.href = pckg.repository.url;

    const name = document.createElement('h6');
    name.append(nameLink);

    const author = document.createElement('a');
    author.textContent = pckg.author.name;
    author.href = `mailto:${pckg.author.email}`;

    const developed = document.createElement('p');
    developed.textContent = `Desarrollado por `;
    developed.append(author);

    const deps = document.createElement('ul');

    const electronDep = document.createElement('li');
    const chromeDep = document.createElement('li');
    const faDep = document.createElement('li');

    electronDep.textContent = `Electron ${remote.process.versions.electron}`;
    chromeDep.textContent = `Chrome ${remote.process.versions.chrome}`;

    const faLink = document.createElement('a');
    faLink.textContent = 'Font Awesome Free';
    faLink.href = 'https://fontawesome.com/license/free';
    faDep.append(faLink);

    deps.append(electronDep);
    deps.append(chromeDep);
    deps.append(faDep);

    this.append(icon);
    this.append(name);
    this.append(developed);
    this.append(deps);

    this.querySelectorAll('a').forEach(a =>
      a.onclick = ev => {
        ev.preventDefault();
        shell.openExternal(a.href);
      });
  }
}

customElements.define('about-content', About);

export default About;
