const Computer = require('./js/Computer');

const LinkLayer = require('./js/link/LinkLayer');
const FixedLayer = require('./js/FixedLayer');
const Menu = require('./js/menu/Menu');
const Gallery = require('./js/Gallery');

const computer = new Computer();

const gallery = new Gallery();
const menu = new Menu();

const linkLayer = new LinkLayer();
const fixedLayer = new FixedLayer();

menu.getItem('gallery').gallery = gallery;

gallery.addEventListener('add', ev => {
  const instance = ev.detail;

  computer.addCpnt(instance);

  instance.trash = menu.getItem('trash');

  instance.addEventListener('remove', () => {
    for (const input of instance.inputs) {
      linkLayer.removeInput(input);
    }

    for (const output of instance.outputs) {
      linkLayer.removeOutput(output);
    }

    computer.removeCpnt(instance.constructor.type, instance.id);
  });

  instance.showIO = menu.getItem('link').show;
  menu.getItem('link').addEventListener('show', ev => instance.showIO = ev.detail);

  instance.addEventListener('link', ev => {
    const input = ev.detail.input;
    const output = ev.detail.output;

    linkLayer.addLink(input, output);
  });

  instance.addEventListener('move', () => {
    for (const input of instance.inputs) {
      linkLayer.moveInput(input);
    }

    for (const output of instance.outputs) {
      linkLayer.moveOutput(output);
    }
  });

  instance.addEventListener('unlink', ev => {
    linkLayer.removeInput(ev.detail);
  });

  document.body.appendChild(instance);
});

fixedLayer.appendChild(menu);
fixedLayer.appendChild(gallery);

document.body.appendChild(linkLayer);
document.body.appendChild(fixedLayer);

document.ondragstart = () => false;
