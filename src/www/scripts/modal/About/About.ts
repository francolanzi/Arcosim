const { ipcRenderer, shell } = window.require('electron');

type Versions = typeof process.versions;

class About extends HTMLElement {
  public constructor () {
    super();

    Promise.all([
      ipcRenderer.invoke('get-versions') as Promise<Versions>,
      ipcRenderer.invoke('get-package') as Promise<Record<string, unknown>>
    ]).then(([versions, pckg]) => {
      const repository = pckg.repository as Record<string, unknown>;
      const author = pckg.author as Record<string, unknown>;

      const iconImg = document.createElement('img');
      iconImg.src = 'images/icon.svg';

      const icon = document.createElement('a');
      icon.href = repository.url as string;
      icon.append(iconImg);

      const nameLink = document.createElement('a');
      nameLink.textContent = `Arcosim ${pckg.version}`;
      nameLink.href = repository.url as string;

      const name = document.createElement('h6');
      name.append(nameLink);

      const authorLink = document.createElement('a');
      authorLink.textContent = author.name as string;
      authorLink.href = `mailto:${author.email}`;

      const developed = document.createElement('p');
      developed.textContent = 'Desarrollado por ';
      developed.append(authorLink);

      const deps = document.createElement('ul');

      const electronDep = document.createElement('li');
      const chromeDep = document.createElement('li');
      const faDep = document.createElement('li');

      electronDep.textContent = `Electron ${versions.electron}`;
      chromeDep.textContent = `Chrome ${versions.chrome}`;

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

      this.querySelectorAll('a').forEach(a => {
        a.onclick = ev => {
          ev.preventDefault();
          shell.openExternal(a.href);
        };
      });
    });
  }
}

customElements.define('about-content', About);

export default About;
