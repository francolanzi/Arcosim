const Computer = require('./scripts/Computer');

const LinkLayer = require('./scripts/link/LinkLayer');
const FixedLayer = require('./scripts/FixedLayer');
const ModalLayer = require('./scripts/ModalLayer');
const Menu = require('./scripts/menu/Menu');
const Gallery = require('./scripts/Gallery');

const computer = new Computer();

const gallery = new Gallery();
const menu = new Menu();

const linkLayer = new LinkLayer();
const fixedLayer = new FixedLayer();
const modalLayer = new ModalLayer();

menu.getButton('run').computer = computer;
menu.getButton('step').computer = computer;
menu.getButton('reset').computer = computer;

menu.getButton('cpnt').gallery = gallery;

gallery.addEventListener('add', ev => {
  const instance = ev.detail;

  computer.addCpnt(instance);

  instance.trash = menu.getButton('trash');

  instance.addEventListener('config', () => {
    const type = instance.constructor.type;
    const config = instance.config;
    if (config) {
      modalLayer.show(type, config);
    }
  });

  instance.addEventListener('remove', () => {
    for (const input of instance.inputs) {
      linkLayer.removeInput(input);
    }

    for (const output of instance.outputs) {
      linkLayer.removeOutput(output);
    }

    computer.removeCpnt(instance.constructor.type, instance.id);
  });

  instance.showIO = menu.getButton('link').show;
  menu.getButton('link').addEventListener('show', ev => instance.showIO = ev.detail);

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

  document.body.append(instance);
});

fixedLayer.append(menu);
fixedLayer.append(gallery);

document.body.append(linkLayer);
document.body.append(fixedLayer);

document.body.append(modalLayer);

document.ondragstart = () => false;
